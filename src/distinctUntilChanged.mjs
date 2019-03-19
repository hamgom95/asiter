// filter out distinct values
export async function* distinctUntilChanged(asyncIter) {
    let previousItem = Symbol();
    for await (const item of asyncIter) {
      if (item !== previousItem) {
        yield item;
      }
      previousItem = item;
    }
}