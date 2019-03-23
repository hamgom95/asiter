// create deferred
const Deferred = (obj = {}) => (obj.promise = new Promise((resolve, reject) => Object.assign(obj, { resolve, reject })), obj);

const doneValue = { done: true, value: undefined };

// use additional class to seperate iterator and subject implementation
class SubjectIterator {
    constructor(subject) {
        this.subject = subject;
    }
    async throw(error) {
        this.subject.done = true;
        this.subject.finallyCallbacks.map(cb => cb());
        // fail any waiting deferreds
        for (const deferred of this.subject.deferreds) {
            deferred.reject(error);
        }
        throw error;
    }
    async return(value) {
        this.subject.done = true;
        this.subject.finallyCallbacks.map(cb => cb());
        // fail any waiting deferreds
        for (const deferred of this.subject.deferreds) {
            deferred.resolve(doneValue);
        }
        return doneValue;
    }
    async next(value) {
        if (this.subject.error) throw this.subject.error;

        const queuedItem = this.subject.queue.shift();
        if (this.subject.queue.length === 0) {
            this.subject.backPressureDeferred.resolve();
            this.subject.backPressureDeferred = Deferred();
        }
        if (queuedItem !== undefined) return queuedItem;


        if (this.subject.noMoreResults && !this.subject.done) {
            this.subject.done = true;
            this.subject.finallyCallbacks.map(cb => cb());
        }
        if (this.subject.done) return doneValue;

        const deferred = Deferred();
        this.subject.deferreds.push(deferred);
        return await deferred.promise;
    }
    [Symbol.asyncIterator]() {
        return this;
    }
}

export class Subject {
    constructor() {
        this.deferreds = [];
        this.queue = [];
        this.done = false;
        this.backPressureDeferred = Deferred();
        this.finallyCallbacks = [];
        this.error = undefined;
    }

    // generator implementation
    async* _iterator() {
        try {
            while (true) {
                if (this.error) throw this.error;

                const queuedItem = this.queue.shift();
                if (this.queue.length === 0) {
                    this.backPressureDeferred.resolve();
                    this.backPressureDeferred = Deferred();
                }
                if (queuedItem !== undefined) yield queuedItem;

                if (this.noMoreResults && !this.done) {
                    this.done = true;
                    this.finallyCallbacks.map(cb => cb());
                }
                if (this.done) break;

                
                const deferred = Deferred();
                this.deferreds.push(deferred);
                const v = await deferred.promise;
                if (v) yield v;
            }
        } catch(error) {
            this.done = true;
            this.finallyCallbacks.map(cb => cb());
            // fail any waiting deferreds
            this.deferreds.map(d => d.resolve(error));
            throw error;
        } finally {
            this.done = true;
            this.finallyCallbacks.map(cb => cb());
            // fail any waiting deferreds
            this.deferreds.map(d => d.resolve(doneValue));
        }
    }

    // use getter to split iterator and subject setup
    get iterator() {
        return this._iterator();
    }

    finally(callback) {
        this.finallyCallbacks.push(callback);
    }

    async onCompleted() {
        this.deferreds.map(d => d.resolve());
        this.noMoreResults = true;
    }

    async onNext(value) {
        const deferred = this.deferreds.pop();
        if (deferred !== undefined) {
            deferred.resolve(value);
            return;
        } else {
            this.queue.push(value);
            return await this.backPressureDeferred.promise;
        }
    }

    async onError(error) {
        this.error = error;
        this.deferreds.map(d => d.reject(error));
        this.noMoreResults = true;
    }
}