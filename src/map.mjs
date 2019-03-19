// map over async iterator
export async function* map(asyncIter, callback) {
    let i = 0;
    for await (const item of asyncIter) {
        yield callback(item, i++);
    }
}