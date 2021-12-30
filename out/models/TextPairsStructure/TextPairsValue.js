"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TextPairsValue_valueText, _TextPairsValue_valueCollection;
Object.defineProperty(exports, "__esModule", { value: true });
const TextPairsLine_1 = require("./TextPairsLine");
class TextPairsValue {
    constructor() {
        _TextPairsValue_valueText.set(this, "");
        _TextPairsValue_valueCollection.set(this, []);
    }
    assign(newValue) {
        if (typeof newValue === "string") {
            __classPrivateFieldSet(this, _TextPairsValue_valueText, newValue, "f");
        }
        else if (Array.isArray(newValue)) {
            for (const newLine of newValue) {
                if (newLine instanceof TextPairsLine_1.default) {
                    __classPrivateFieldGet(this, _TextPairsValue_valueCollection, "f").push(newLine);
                }
            }
        }
    }
    valueOf() {
        return __classPrivateFieldGet(this, _TextPairsValue_valueText, "f") !== "" ? __classPrivateFieldGet(this, _TextPairsValue_valueText, "f") : __classPrivateFieldGet(this, _TextPairsValue_valueCollection, "f");
    }
    toString() {
        return __classPrivateFieldGet(this, _TextPairsValue_valueText, "f") !== "" ? __classPrivateFieldGet(this, _TextPairsValue_valueText, "f") : __classPrivateFieldGet(this, _TextPairsValue_valueCollection, "f").map(v => v.value.toString()).join("\n");
    }
}
exports.default = TextPairsValue;
_TextPairsValue_valueText = new WeakMap(), _TextPairsValue_valueCollection = new WeakMap();
//# sourceMappingURL=TextPairsValue.js.map