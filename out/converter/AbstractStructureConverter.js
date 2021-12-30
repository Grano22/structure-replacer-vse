"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractStructureConverter_exceptions;
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../throwable/Exception");
const tools_1 = require("../tools/tools");
class AbstractStructureConverter {
    constructor(converterConfig = {}) {
        _AbstractStructureConverter_exceptions.set(this, []);
    }
    canConvert(tgStructID) {
        return typeof this['to' + (0, tools_1.default)(tgStructID)] === 'function';
    }
    convert(structure, tgStructID, options = {}) {
        try {
            const tgMethodName = tgStructID;
            if (!this.canConvert(tgStructID)) {
                throw new Exception_1.default("Convertion type " + tgMethodName + " not found in " + this.constructor.name);
            }
            return this['to' + (0, tools_1.default)(tgMethodName)](structure, options);
        }
        catch (exc) {
            return null;
        }
    }
    ;
    pathException(exc) {
        __classPrivateFieldGet(this, _AbstractStructureConverter_exceptions, "f").push(exc);
    }
}
exports.default = AbstractStructureConverter;
_AbstractStructureConverter_exceptions = new WeakMap();
//# sourceMappingURL=AbstractStructureConverter.js.map