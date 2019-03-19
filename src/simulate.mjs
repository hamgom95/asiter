import {wait} from "./helper";

/**
 * Simulate iterator that emits values with delays between them
 */
export async function* simulate(yields) {
    for await (const [value, delay] of yields) {
        if (delay) await wait(delay);
        yield value;
    }
}