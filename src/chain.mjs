export async function* chain(asyncIters) {
    for await (const iter of asyncIters) {
        for await (const item of iter) {
            yield item;
        }
    }
}