export async function* of(...vals) {
    for await (const val of vals) {
        yield val;
    }
}