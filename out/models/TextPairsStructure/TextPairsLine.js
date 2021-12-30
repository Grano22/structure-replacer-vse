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
var _TextPairsLine_key, _TextPairsLine_value, _TextPairsLine_separator;
Object.defineProperty(exports, "__esModule", { value: true });
const TextPairsValue_1 = require("./TextPairsValue");
class TextPairsLine {
    constructor(key = "", value = "") {
        _TextPairsLine_key.set(this, "");
        _TextPairsLine_value.set(this, new TextPairsValue_1.default);
        _TextPairsLine_separator.set(this, "-");
        __classPrivateFieldSet(this, _TextPairsLine_key, key, "f");
        __classPrivateFieldGet(this, _TextPairsLine_value, "f").assign(value);
    }
    get key() {
        return __classPrivateFieldGet(this, _TextPairsLine_key, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _TextPairsLine_value, "f");
    }
    setKey(key) {
        __classPrivateFieldSet(this, _TextPairsLine_key, key, "f");
    }
    setValue(value) {
        __classPrivateFieldGet(this, _TextPairsLine_value, "f").assign(value);
    }
    toString() {
        return `${__classPrivateFieldGet(this, _TextPairsLine_key, "f")}${__classPrivateFieldGet(this, _TextPairsLine_separator, "f")}${__classPrivateFieldGet(this, _TextPairsLine_value, "f").toString()}`;
    }
}
exports.default = TextPairsLine;
_TextPairsLine_key = new WeakMap(), _TextPairsLine_value = new WeakMap(), _TextPairsLine_separator = new WeakMap();
//# sourceMappingURL=TextPairsLine.js.map