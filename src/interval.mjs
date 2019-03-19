import { wait } from "./helper";

export async function* interval(ms) {
    let i = 0;
    while (true) {
        await wait(ms);
        yield i++;
    }
}