// manually wrap stream events as async generator
export async function* readStream(file, opts) {
    const stream = fs.createReadStream(file, opts);
    let ended = false;
    let fulfill;

    stream.on("end", () => ended = true);
    try {
        while (true) {
            if (ended) break;
            yield new Promise(resolve => stream.once("data", fulfill = resolve));
        }
    } finally {
        stream.off("data", fulfill);
    }
}