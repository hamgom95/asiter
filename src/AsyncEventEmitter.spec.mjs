import {AsyncEventEmitter} from "./AsyncEventEmitter";

import tape from "tape";

tape("AsyncEventEmitter", async (t) => {
    const emitter = new AsyncEventEmitter();
    let i = 0;
    emitter.on("a", () => new Promise(resolve => setImmediate(() => resolve(++i))));
    emitter.on("a", () => new Promise(resolve => setImmediate(() => resolve(++i))));

    const p = emitter.emit("a");
    t.equal(i, 0, "should be 0, because it gets run before async event handlers");

    t.equal(await p, true, "emit should return true for success");
    t.equal(i, 2, "should be 2 because we waited for event handlers on emit");

    t.end();
});

