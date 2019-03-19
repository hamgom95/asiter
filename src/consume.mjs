// consume iterator
export async function consume(asyncIter) {
    for await (const _item of asyncIter) {
      // do nothing
    }
}