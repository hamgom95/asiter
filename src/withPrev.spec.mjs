import {collect} from "./collect";
import {withPrev} from "./withPrev";

import tape from "tape";

tape("withPrev", async (t) => {
    const vals = await collect(withPrev([1,2,3], 2));
    t.deepEqual(vals, [ [ undefined, 1 ], [ 1, 2 ], [ 2, 3 ] ]);
    t.end();
});