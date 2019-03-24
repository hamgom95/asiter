/**
 * Deferred object.
 * 
 * Like Promise but resolve/reject-able from the outside.
 */
export class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }
}