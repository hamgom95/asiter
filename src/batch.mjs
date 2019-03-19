/**
 * yield batches of n items as arrays
 */
export async function* batch(asyncIter, n) {
    let batch = [];
    for await (const item of asyncIter) {
        if (batch.length === n) {
            yield batch;
            batch = [];
        }
        batch.push(item);
    }
    // yield unfinished batch
    if (batch.length !== 0) yield batch;
}