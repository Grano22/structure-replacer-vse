import TextPairsLine from "../models/TextPairsStructure/TextPairsLine";
import TextPairsStructure from "../structures/TextPairsStructure";
import AbstractStructureParser, { StructureParserOptions } from "./AbstractStructureParser";

export default class TextPairsStructureParser extends AbstractStructureParser {
    public parse(tgStr : string, options : StructureParserOptions = {}): TextPairsStructure {
        const outputStruct = new TextPairsStructure();
        const lines = tgStr.split("\n");
        for (const line of lines) {
            outputStruct.addLine(this.#parseLine(line));
        }
        return outputStruct;
    }

    #parseLine(tgLine : string) : TextPairsLine {
        const outputLine = new TextPairsLine();
        const parts = tgLine.split("\t");
        if (parts.length !== 2) {
            throw new Error("Invalid line format");
        }
        outputLine.setKey(parts[0]);
        outputLine.setValue(parts[1]);
        return outputLine;
    }
}