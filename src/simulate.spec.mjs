import {simulate} from "./simulate";

import tape from "tape";

tape("simulate", async (t) => {
    t.plan(3);

    for await (const item of simulate([["a"], ["b", 100], ["c"]])) {
        t.pass();
    }
});