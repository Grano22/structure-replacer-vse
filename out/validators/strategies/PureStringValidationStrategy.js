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
var _PureStringValidationStrategy_instances, _PureStringValidationStrategy_allowedChars, _PureStringValidationStrategy_disalowdChars, _PureStringValidationStrategy_prepareChars;
Object.defineProperty(exports, "__esModule", { value: true });
class PureStringValidationStrategy {
    constructor(allowedChars, disallowedChars = []) {
        _PureStringValidationStrategy_instances.add(this);
        _PureStringValidationStrategy_allowedChars.set(this, void 0);
        _PureStringValidationStrategy_disalowdChars.set(this, void 0);
        __classPrivateFieldSet(this, _PureStringValidationStrategy_allowedChars, __classPrivateFieldGet(this, _PureStringValidationStrategy_instances, "m", _PureStringValidationStrategy_prepareChars).call(this, allowedChars), "f");
        __classPrivateFieldSet(this, _PureStringValidationStrategy_disalowdChars, __classPrivateFieldGet(this, _PureStringValidationStrategy_instances, "m", _PureStringValidationStrategy_prepareChars).call(this, disallowedChars), "f");
    }
    validString(tgStr) {
        if (tgStr.length <= 0) {
            return false;
        }
        return true;
    }
    validChar(tgChar) {
        if (tgChar.length <= 0 || tgChar.length > 1) {
            return false;
        }
        const tgCode = tgChar.charCodeAt(0);
        return __classPrivateFieldGet(this, _PureStringValidationStrategy_allowedChars, "f").includes(tgCode) && !__classPrivateFieldGet(this, _PureStringValidationStrategy_disalowdChars, "f").includes(tgCode);
    }
}
exports.default = PureStringValidationStrategy;
_PureStringValidationStrategy_allowedChars = new WeakMap(), _PureStringValidationStrategy_disalowdChars = new WeakMap(), _PureStringValidationStrategy_instances = new WeakSet(), _PureStringValidationStrategy_prepareChars = function _PureStringValidationStrategy_prepareChars(charsIndicator) {
    const outputNums = [];
    for (const charIndicator of charsIndicator) {
        if (charIndicator.length > 1) {
            if (charIndicator.indexOf("-") === 1) {
                const charRange = charIndicator.split("-");
                const fromCharCode = charRange[0].charCodeAt(0), toCharCode = charRange[1].charCodeAt(0);
                for (let charInd = fromCharCode; charInd < toCharCode; charInd++) {
                    if (!outputNums.includes(charInd)) {
                        outputNums.push(charInd);
                    }
                }
            }
            else if (charIndicator.indexOf(",") >= 1) {
                const charsBag = charIndicator.split(",");
                for (let charItem of charsBag) {
                    const charCode = charItem.charCodeAt(0);
                    if (!outputNums.includes(charCode)) {
                        outputNums.push(charCode);
                    }
                }
            }
        }
        else if (charIndicator.length > 0) {
            outputNums.push(charIndicator.charCodeAt(0));
        }
        else {
            continue;
        }
    }
    return outputNums;
};
//# sourceMappingURL=PureStringValidationStrategy.js.map