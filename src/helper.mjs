export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const ignored = Symbol();
// wait for last promise call
export function last(fn) {
    let lastSeen = ignored;
    return function(...args) {
        const current = lastSeen = fn.call(this, ...args);
        return current.then(value => (current !== lastSeen) ? ignored : value);
    }
}