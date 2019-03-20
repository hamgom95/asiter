import * as fs from "fs";
import * as readline from "readline";

export async function* readLines(filename) {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(filename, {encoding: 'utf8'})
    });
    // yield from (use new readline async generator interface)
    return yield* lineReader;
}