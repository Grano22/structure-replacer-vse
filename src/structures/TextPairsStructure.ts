import TextPairsLine from "../models/TextPairsStructure/TextPairsLine";
import AbstractStructure from "./AbstractStructure";

export default class TextPairsStructure extends AbstractStructure {
    #lines : TextPairsLine[] = [];
    #separator = "\n";

    get lines() : TextPairsLine[] {
        return this.#lines;
    }

    get length() : number {
        return this.#lines.length;
    }

    public addLine(line : TextPairsLine) : void {
        this.#lines.push(line);
    }

    public setSeparator(separator : string) : void {
        this.#separator = separator;
    }

    public toString() : string {
        return this.#lines.map(line => line.toString()).join(this.#separator);
    }
}