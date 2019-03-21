/**
 * Goes through a iterable applying the scanner function to the accumulator
 * returning the accumulator at each step
 */
export async function* scan(asyncIter, scanner, init) {
    let i = 0;
    let accumulator = await init;
    for await (const item of asyncIter) {

        // use first item of iterator
        if (accumulator === undefined) {
            accumulator = item;
            continue;
        }
        
        yield accumulator;
        accumulator = await scanner(accumulator, item, i++);
    }
    yield accumulator;
}