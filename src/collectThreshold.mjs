import {wait} from "./helper";

/**
 * Group items in async iterator between threshold.
 */
export async function* collectThreshold(asyncIter, ms) {
    let group = null;
    let pendingTimerPromise  = null;

    for await (const item of asyncIter) {
        if (!pendingTimerPromise) {
            if (group !== null) yield group;
            group = [item];
            pendingTimerPromise = wait(ms).then(() => pendingTimerPromise = null);
        } else {
            group.push(item);
        }
    }
    if (group.length !== 0) yield group;
}
