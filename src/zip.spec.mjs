import {zip} from "./zip";
import {collect} from "./collect";
import {of} from "./of";

import tape from "tape";

tape("zip", async (t) => {

    const vals = await collect(zip(of(1,2,3), of(4,5,6), of(7,8,9)));
    t.deepEqual(vals, [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]);
    t.end();
});