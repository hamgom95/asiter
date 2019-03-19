export async function* zip(...asyncIters) {
    const iterators = asyncIters.map(v => v[Symbol.asyncIterator]());

    while (true) {
        const nexts = await Promise.all(iterators.map(v => v.next()));
        
        // stop on first done generator
        if (nexts.map(v => v.done).some(v => v === true)) break;

        yield nexts.map(v => v.value);
    }
}