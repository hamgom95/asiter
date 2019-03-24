import EventEmitter from "events";

/**
 * EventEmitter with async emit method.
 */
export class AsyncEventEmitter extends EventEmitter {
    async emit(type, ...args) {
        const handler = this._events[type];
        if (handler === undefined) return false;

        if (typeof handler[Symbol.iterator] === 'function') { // multiple handlers
            const promises = [...handler].map(listener => Reflect.apply(listener, this, args));
            await Promise.all(promises);
        } else { // one handler
            await Reflect.apply(handler, this, args);
        }
        return true;
    }
}

