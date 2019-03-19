// filter for async iterators
export async function* filter(asyncIter, predicate) {
    let i = 0;
    for await (const item of asyncIter) {
        if (predicate(item, i++)) yield item;
    }
}