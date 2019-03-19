// generator to filter out last yield from n yields if triggered inside of threshold timeinterval
export async function* countIntervalThrottle(asyncIter, n, threshold) {
    let count = 0;
    let lastTime = 0;
    for await (const item of asyncIter) {
        const now = Date.now();
        const delta = now - lastTime;
        if (delta > threshold) count = 0;
        if (++count === n) {
            count = 0;
            lastTime = 0;
            yield item;
        } else {
            lastTime = now;
        }
    }
}