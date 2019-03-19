export async function* enumerate(asyncIter) {
    let i = 0;
    for await (const item of asyncIter) {
        yield [i++, item];
    }
}