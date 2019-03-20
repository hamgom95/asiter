import * as fs from "fs";
import {promisify} from "util";
import * as path from "path";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Async generator to traverse directory.
 * @param rootpath Root folder path to traverse
 * @param postfixDir Put directory after children if true
 * @returns [filepath, relative, filename]
 */
export async function* walkDir(rootpath, postfixDir=false) {
    async function* recurse(dirpath) {
        const files = await readdir(dirpath);
        for (const filename of files) {
            const filepath = path.join(dirpath, filename);
            const relative = path.relative(rootpath, filepath);
            const stats = await stat(filepath);
    
            if (stats.isDirectory()) {
                if (postfixDir) yield* recurse(filepath);
                yield [filepath, relative];
                if (!postfixDir) yield* recurse(filepath);
            } else {
                yield [filepath, relative, filename];
            }
        }
    }
    yield* recurse(rootpath);
}