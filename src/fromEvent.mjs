// convert event to async generator
export async function* fromEvent(target, event) {
    let fulfill;
    try {
        while (true) {
            yield new Promise(resolve => target.once(event, fulfill = resolve));
        }
    } finally {
        // unregister eventhandler on generator.return
        target.off(event, fulfill);
    }
} 
