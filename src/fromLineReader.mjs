import {Subject} from "./subject";

export function fromLineReader(lineReader) {
    const subject = new Subject();

    lineReader.on("line", (line) => subject.onNext(line));

    lineReader.on("close", () => subject.onCompleted());

    subject.finally(() => lineReader.close());

    return subject.iterator;
}