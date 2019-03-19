// collect to array
export async function collect(asyncIter) {
    let array = [];
    for await (const item of asyncIter) array.push(item);
    return array;
}