// take n times after start items passed
export async function* takeRange(asyncIter, n, start=0) {
    let i = 0;
    for await (const item of asyncIter) {
        if (i >= start && i <= start + n) yield item;
        i++;
    }
}
