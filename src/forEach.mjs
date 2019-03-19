// consume iterator
export async function forEach(asyncIter, callback) {
    let i = 0;
    for await (const item of asyncIter) {
        await callback(item, i++);
    }
}