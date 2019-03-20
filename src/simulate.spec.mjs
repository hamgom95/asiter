import {simulate} from "./simulate";
import {collect} from "./collect";

import tape from "tape";

tape("simulate", async (t) => {
    const vals = await collect(simulate([["a"], ["b", 100], ["c"]]));
    t.deepEqual(vals, ["a", "b", "c"]);
    t.end();
});

