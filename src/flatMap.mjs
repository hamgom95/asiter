export async function* flatMap(asyncIters, callback) {
    for await (const asyncIter of asyncIters) {
        for await (const inner of asyncIter) {
            yield await callback(inner);
        }
    }
}