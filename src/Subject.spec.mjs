import {Subject} from "./Subject";
import {collect} from "./collect";

import tape from "tape";

tape("Subject", async (t) => {
    const subject = new Subject();
    setImmediate(async () => {
        // set next value while waiting for backpressure to be handled
        await subject.emit("next", "a");
        await subject.emit("next", "b");
        await subject.emit("next", "c");
        await subject.emit("completed");
    });

    t.deepEqual(await collect(subject), ["a", "b", "c"]);
    t.end();
});

tape("Subject2", async (t) => {
    const subject = new Subject();
    subject.emit("next", "a");
    subject.emit("error", "ERROR");

    try {
        await collect(subject);
    } catch(err) {
        t.equal(err, "ERROR");
    }
    t.end();
});