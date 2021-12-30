"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TextPairsStructureParser_instances, _TextPairsStructureParser_parseLine;
Object.defineProperty(exports, "__esModule", { value: true });
const TextPairsLine_1 = require("../models/TextPairsStructure/TextPairsLine");
const TextPairsStructure_1 = require("../structures/TextPairsStructure");
const AbstractStructureParser_1 = require("./AbstractStructureParser");
class TextPairsStructureParser extends AbstractStructureParser_1.default {
    constructor() {
        super(...arguments);
        _TextPairsStructureParser_instances.add(this);
    }
    parse(tgStr, options = {}) {
        const outputStruct = new TextPairsStructure_1.default();
        const lines = tgStr.split("\n");
        for (const line of lines) {
            outputStruct.addLine(__classPrivateFieldGet(this, _TextPairsStructureParser_instances, "m", _TextPairsStructureParser_parseLine).call(this, line));
        }
        return outputStruct;
    }
}
exports.default = TextPairsStructureParser;
_TextPairsStructureParser_instances = new WeakSet(), _TextPairsStructureParser_parseLine = function _TextPairsStructureParser_parseLine(tgLine) {
    const outputLine = new TextPairsLine_1.default();
    const parts = tgLine.split("\t");
    if (parts.length !== 2) {
        throw new Error("Invalid line format");
    }
    outputLine.setKey(parts[0]);
    outputLine.setValue(parts[1]);
    return outputLine;
};
//# sourceMappingURL=TextPairsStructureParser.js.map