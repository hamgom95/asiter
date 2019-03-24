import {batch} from "./batch";
import {collect} from "./collect";

import tape from "tape";

tape("batch", async (t) => {
    const vals = await collect(batch([1,2,3,4,5], 3));
    t.deepEqual(vals, [ [ 1, 2, 3 ], [ 4, 5 ] ]);
    t.end();
});