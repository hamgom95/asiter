// yield history of last n items from iterator
export async function* withPrev(asyncIter, n) {
    // fill so that yielded group is always of size n
    const vals = new Array(n-1).fill(undefined);

    for await (const item of asyncIter) {
        vals.push(item); // add item to end of queue
        yield vals;
        vals.shift(); // remove item from start of queue
    }
}