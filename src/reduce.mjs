// reduce for async iterators
export async function reduce(asyncIter, callback, init) {
    let i = 0;
    let acc = init;

    for await (const item of asyncIter) {
        // use first item as stat if not given
        if (i === 0 && acc === undefined) {
            acc = item;
            continue;
        }

        acc = callback(acc, item, i++);
    }
    return start;
}
