"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _TextPairsStructure_lines, _TextPairsStructure_separator;
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractStructure_1 = require("./AbstractStructure");
class TextPairsStructure extends AbstractStructure_1.default {
    constructor() {
        super(...arguments);
        _TextPairsStructure_lines.set(this, []);
        _TextPairsStructure_separator.set(this, "\n");
    }
    get lines() {
        return __classPrivateFieldGet(this, _TextPairsStructure_lines, "f");
    }
    get length() {
        return __classPrivateFieldGet(this, _TextPairsStructure_lines, "f").length;
    }
    addLine(line) {
        __classPrivateFieldGet(this, _TextPairsStructure_lines, "f").push(line);
    }
    setSeparator(separator) {
        __classPrivateFieldSet(this, _TextPairsStructure_separator, separator, "f");
    }
    toString() {
        return __classPrivateFieldGet(this, _TextPairsStructure_lines, "f").map(line => line.toString()).join(__classPrivateFieldGet(this, _TextPairsStructure_separator, "f"));
    }
}
exports.default = TextPairsStructure;
_TextPairsStructure_lines = new WeakMap(), _TextPairsStructure_separator = new WeakMap();
//# sourceMappingURL=TextPairsStructure.js.map