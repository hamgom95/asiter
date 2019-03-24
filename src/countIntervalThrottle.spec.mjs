import {collect} from "./collect";
import {simulate} from "./simulate";
import {countIntervalThrottle} from "./countIntervalThrottle";

import tape from "tape";

tape("countIntervalThrottle", async (t) => {
    const vals = await collect(countIntervalThrottle(simulate([["a", 100], ["b", 50], ["c", 200]]), 2, 200));
    t.deepEqual(vals, ["b"]);
    t.end();
});