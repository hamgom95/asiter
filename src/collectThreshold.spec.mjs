import {collectThreshold} from "./collectThreshold";
import {collect} from "./collect";
import {simulate} from "./simulate";

import tape from "tape";

tape("collectThreshold", async (t) => {
    const vals = await collect(collectThreshold(simulate([["a", 100], ["b", 200], ["c", 1000], ["d", 100], ["e", 100], ["f", 1000]]), 500));
    t.deepEqual(vals, [ [ 'a', 'b' ], [ 'c', 'd', 'e' ], [ 'f' ] ]);
    t.end();
});