import * as asiter from "./index";

async function testZipLongest() {
    const vals = await collect(zipLongest(of(1,2,3), of(4,5), of(6)));
    console.log(vals);
}

async function testWalkDir() {
    for await (const [filepath, relative, filename] of walkDir("/tmp/1")) {
        console.log({filename, filepath, relative});
    }
}

// convert buffer chunks to strings
const bufferToChunks = (chunksAsync, encoding="utf-8") => map(chunksAsync, chunk => chunk.toString(encoding));

// async iter to array
const collect2 = asyncIter => reduce(asyncIter, (acc, item) => [...acc, item], []);

// count elements in async iterator 
const count = asyncIter => reduce(asyncIter, (acc, item) => acc+1, 0);

// cahin async generators tugether (alternative to streams)
async function countLines(filename) {
    const buffers = fs.createReadStream(filename);
    const chunks = bufferToChunks(buffers, "utf-8");
    const lines = chunksToLines(chunks);
    const lineCount = await count(lines);
    return lineCount;
}

class Ticker {
    constructor(interval=1000) {
        this.interval = interval;
        this[Symbol.asyncIterator] = this[Symbol.asyncIterator].bind(this);
    }
    async *[Symbol.asyncIterator]() {
        let i = 0;
        while (true) {
            await wait(this.interval);
            yield i++; // wrapped into promise
        }
    }
}

// send values from async iterator to outputs generators
async function tee(input, ...outputs) {
    for await (const item of input) {
        for (const output of outputs) {
            output.next(item);
        }
    }
}





async function* flatMap2(asyncIters, callback) {
    for await (const value of chain(asyncIters)) {
        yield callback(value);
    }
}

// alternative implementation
// 1. convert iter to iter of [prev, curr]
// 2. filter [prev, curr] iter for pairs where prev !== curr
// 3. map to get only curr from pair
export const distinctUntilChanged2 = (asyncIter) => map(filter(withPrev(asyncIter, 2), ([prev, curr]) => prev !== curr), ([prev, curr]) => curr);

async function test_tee() {
    async function* log1() {
        while (true) { console.log("1", yield null); }
    }
    async function* log2() {
        while (true) {
            const val = yield null;
            if (val === 5) break;
            console.log("2", val);
        }
    }

    tee(new Ticker(200), spool(log1()), spool(log2()));
}

async function test() {

    const a = () => simulate([
        ["a", 100],
        ["b", 1000],
        ["c", 100],
        ["d", 0],
        ["d", 0],
        ["d", 100],
    ]);

    for await (const t of batch(a(), 2)) {
        console.log(t);
    }

    for await (const t of take(a(), 3, 2)) {
        console.log(t);
    }

    for await (const t of distinct(a())) {
        console.log(t);
    }

    for await (const t of withPrev(a(), 3)) {
        console.log(t);
    }

    for await (const t of timeThreshold(a(), 2, 500)) {
        console.log("double click");
    }
    for await (const chunk of readLines(__filename)) {
        console.log(chunk.length);
    }

    for await (const item of distinct(a())) {
        console.log(item);
    }

    const lines = await countLines(__filename);
    console.log({lines});

    for await (const val of new Ticker(1000)) {
        console.log(val);
        if (val > 3) break;
    }

}