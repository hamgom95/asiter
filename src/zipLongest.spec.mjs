import {of} from "./of";
import {collect} from "./collect";
import {zipLongest} from "./zipLongest";

import tape from "tape";

tape("zipLongest", async (t) => {
    const vals = await collect(zipLongest(of(1, 2, 3), of(4, 5), of(6)));
    t.deepEqual(vals, [ [ 1, 4, 6 ], [ 2, 5, undefined ], [ 3, undefined, undefined ] ]);
    t.end();
});