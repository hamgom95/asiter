import {Subject} from "./Subject";

export function fromLineReader(lineReader) {
    const subject = new Subject();
    lineReader.on("line", (line) => subject.emit("next", line));
    lineReader.on("error", (error) => subject.emit("error", error));
    lineReader.on("close", () => subject.emit("completed"));
    subject.on("finally", () => lineReader.close());
    return subject[Symbol.asyncIterator]();
}