import EventEmitter from "events";

/**
 * EventEmitter with async emit method.
 */
export class AsyncEventEmitter extends EventEmitter {
    async _emit(type, args, parallel=false) {
        const handler = this._events[type];
        if (handler === undefined) return false;

        if (typeof handler[Symbol.iterator] === 'function') { // multiple handlers
            if (parallel) {
                const promises = [...handler].map(listener => Reflect.apply(listener, this, args));
                await Promise.all(promises);
            } else { // one after another
                for (const listener of handler) {
                    await Reflect.apply(listener, this, args);
                }
            }
        } else { // one handler
            await Reflect.apply(handler, this, args);
        }
        return true;
    }

    async emit(type, ...args) { return this._emit(type, args, false); }
    async emitParallel(type, ...args) { return this._emit(type, args, true); }
}

