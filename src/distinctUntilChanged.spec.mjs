import {of} from "./of";
import {collect} from "./collect";
import {distinctUntilChanged} from "./distinctUntilChanged";

import tape from "tape";

tape("distinctUntilChanged", async (t) => {
    const vals = await collect(distinctUntilChanged(of(1, 1, 2, 2, 3)));
    t.deepEqual(vals, [1, 2, 3]);
    t.end();
});