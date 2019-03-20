import { wait } from "./helper";

// emit only first yield for interval
export async function* throttle(asyncIter, ms) {
    let pendingTimerPromise  = null;
    for await (const item of asyncIter) { 
        if (!pendingTimerPromise) { 
            yield item;
            pendingTimerPromise = wait(ms).then(() => pendingTimerPromise = null);
        }
    }
}