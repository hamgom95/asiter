import {ignored, last} from "./helper";

// map over async iter and yield latest call 
export async function* flatMapLatest(asyncIter, callback) {
    for await (const value of map(asyncIter, last(callback))) {
        if (value !== ignored) yield value; // last call
    }
}
