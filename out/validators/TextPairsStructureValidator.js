"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TextPairsStructureValidator_instances, _TextPairsStructureValidator_validateKey, _TextPairsStructureValidator_validateValue, _TextPairsStructureValidator_validateSeparator, _TextPairsStructureValidator_validateLineSeparator, _TextPairsStructureValidator_validateByRange;
Object.defineProperty(exports, "__esModule", { value: true });
const RegexpHelper_1 = require("../helpers/RegexpHelper");
const validationResult_1 = require("../results/validationResult");
const StructureValidationException_1 = require("../throwable/StructureValidationException");
const TypeReportError_1 = require("../throwable/TypeReportError");
const PureStringValidationStrategy_1 = require("./strategies/PureStringValidationStrategy");
const StringableStructureValidator_1 = require("./StringableStructureValidator");
class TextPairsStructureValidator extends StringableStructureValidator_1.default {
    constructor() {
        super(...arguments);
        _TextPairsStructureValidator_instances.add(this);
    }
    getInvaildChars(markerName) {
        return this.getValidationData("invaildChars");
    }
    shortValidationModel(structStr, options) {
        const res = new validationResult_1.default();
        new RegExp(RegexpHelper_1.default.createGroupFromCharacterRanges(options.keyChars) +
            RegexpHelper_1.default.createGroupFromCharacterRanges(options.separatorChars) +
            RegexpHelper_1.default.createGroupFromCharacterRanges(options.valueChars) +
            RegexpHelper_1.default.createGroupFromCharacterRanges(options.lineSeperatorChars)).test(structStr);
        return res;
    }
    validationModel(structStr, options) {
        const res = new validationResult_1.default();
        if (options.trimSides) {
            structStr = structStr.trimLeft().trimRight();
        }
        try {
            const hasKey = __classPrivateFieldGet(this, _TextPairsStructureValidator_instances, "m", _TextPairsStructureValidator_validateKey).call(this, structStr);
            if (!hasKey) {
                throw new StructureValidationException_1.default(this, "Key is not valid");
            }
            const hasSeparator = __classPrivateFieldGet(this, _TextPairsStructureValidator_instances, "m", _TextPairsStructureValidator_validateSeparator).call(this, structStr);
            if (!hasSeparator) {
                throw new StructureValidationException_1.default(this, "Separator is not valid");
            }
            const hasValue = __classPrivateFieldGet(this, _TextPairsStructureValidator_instances, "m", _TextPairsStructureValidator_validateValue).call(this, structStr);
            if (!hasValue) {
                throw new StructureValidationException_1.default(this, "Value is not valid");
            }
            const hasLineSeparator = __classPrivateFieldGet(this, _TextPairsStructureValidator_instances, "m", _TextPairsStructureValidator_validateLineSeparator).call(this, structStr);
            if (!hasLineSeparator) {
                throw new StructureValidationException_1.default(this, "Line separator is not valid");
            }
            res.setParam("markers", this.getValidationData("positionMarkers"));
        }
        catch (err) {
            if (err instanceof StructureValidationException_1.default) {
                res.addExceptions(err);
            }
            else {
                res.addExceptions(TypeReportError_1.default.byComparing(err, StructureValidationException_1.default));
            }
        }
        return res;
    }
}
exports.default = TextPairsStructureValidator;
_TextPairsStructureValidator_instances = new WeakSet(), _TextPairsStructureValidator_validateKey = function _TextPairsStructureValidator_validateKey(tgStr) {
    return __classPrivateFieldGet(this, _TextPairsStructureValidator_instances, "m", _TextPairsStructureValidator_validateByRange).call(this, tgStr, ["a-z", "A-Z", "0-9", "_"], "key");
}, _TextPairsStructureValidator_validateValue = function _TextPairsStructureValidator_validateValue(tgStr) {
    return __classPrivateFieldGet(this, _TextPairsStructureValidator_instances, "m", _TextPairsStructureValidator_validateByRange).call(this, tgStr, ["a-z", "A-Z", "0-9", "_"], "value");
}, _TextPairsStructureValidator_validateSeparator = function _TextPairsStructureValidator_validateSeparator(tgStr) {
    return __classPrivateFieldGet(this, _TextPairsStructureValidator_instances, "m", _TextPairsStructureValidator_validateByRange).call(this, tgStr, ["-"], "separator");
}, _TextPairsStructureValidator_validateLineSeparator = function _TextPairsStructureValidator_validateLineSeparator(tgStr) {
    return __classPrivateFieldGet(this, _TextPairsStructureValidator_instances, "m", _TextPairsStructureValidator_validateByRange).call(this, tgStr, ["\n"], "lineSeparator");
}, _TextPairsStructureValidator_validateByRange = function _TextPairsStructureValidator_validateByRange(tgStr, allowChars, markerName) {
    const strValidator = new PureStringValidationStrategy_1.default(allowChars), lastPos = this.getValidationData("lastPosition");
    for (let chr = lastPos; chr < tgStr.length; chr++) {
        if (!strValidator.validChar(tgStr[chr])) {
            this.addValidationData("positionMarkers", { from: lastPos, to: chr }, markerName);
            if (chr === lastPos) {
                return false;
            }
            this.addValidationData("invaildChars", tgStr[chr]);
            this.setValidationData("lastPosition", () => chr);
            return true;
        }
    }
    return true;
};
//# sourceMappingURL=TextPairsStructureValidator.js.map