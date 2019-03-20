export async function* zipLongest(...asyncIters) {
    const iterators = asyncIters.map(v => v[Symbol.asyncIterator]());

    while (true) {
        const nexts = await Promise.all(iterators.map(v => v.next()));
        
        // stop when all iterators are done
        if (nexts.map(v => v.done).every(v => v === true)) break;

        yield nexts.map(v => v.value);
    }
}