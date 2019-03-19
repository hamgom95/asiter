// reduce for async iterators
export async function reduce(asyncIter, callback) {
    let i = 0;
    for await (const item of asyncIter) {
        // use first item as stat if not given
        if (i === 0 && start === undefined) {
            start = item;
            continue;
        }

        start = callback(start, item, i++);
    }
    return start;
}
