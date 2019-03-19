// stop on first false predicate value
export async function* takeWhile(asyncIter, predicate) {
    let i = 0;
    for await (const item of asyncIter) {
        if (!predicate(item, i++)) break;
        yield item;
    }
}