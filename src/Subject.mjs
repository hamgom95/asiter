import {AsyncEventEmitter} from "./AsyncEventEmitter";
import {Deferred} from "./Deferred";

/**
 * Helper class to provide pull async iterator API for push interfaces.
 * 
 * @event "finally" Call registered cleanup functions
 * @event "next" Send next value and wait till for backPressure handling
 * @event "completed" Signal end of values
 * @event "error" Stop with error
 */
export class Subject extends AsyncEventEmitter {
    constructor() {
        super();

        this.deferreds = [];
        this.queue = [];
        this.backPressureDeferred = new Deferred();

        this.on("error", (error) => {
            this.error = error;
            this.deferreds.map(d => d.reject(error));
        });

        this.on("completed", () => {
            this.completed = true;
            this.deferreds.map(d => d.resolve());
        });

        this.on("next", async (value) => {
            const deferred = this.deferreds.pop();
            if (deferred !== undefined) {
                deferred.resolve(value);
            } else {
                this.queue.push(value);
                return await this.backPressureDeferred.promise;
            }
        });
    }

    /**
     * Provide async iterator api.
     * 
     * return subject[Symbol.asyncIterator]() to only expose iterator
     */
    async* [Symbol.asyncIterator]() {
        try {
            while (true) {
                // throw error if no other handler is registered
                if (this.error) throw this.error;

                const queuedItem = this.queue.shift();
                if (this.queue.length === 0) {
                    this.backPressureDeferred.resolve();
                    this.backPressureDeferred = new Deferred();
                }
                if (queuedItem !== undefined) yield queuedItem;

                if (this.completed) break;

                const deferred = new Deferred();
                this.deferreds.push(deferred);
                const v = await deferred.promise;
                if (!this.completed) yield v;
            }
        } finally {
            // call registered cleanup functions
            await this.emit("finally");
        }
    }
}