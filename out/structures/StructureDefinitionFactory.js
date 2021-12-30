"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _StructureDefinitionFactory_createID;
Object.defineProperty(exports, "__esModule", { value: true });
const StructureDefinition_1 = require("./StructureDefinition");
class StructureDefinitionFactory {
    static createFromObject(tgObject) {
        const prepValidators = [], prepConverters = {};
        for (const structValidator of tgObject.validators) {
            const val = new structValidator();
            prepValidators.push(val);
        }
        for (const structConverterType in tgObject.converters) {
            const conv = new tgObject.converters[structConverterType]();
            prepConverters[structConverterType] = conv;
        }
        const structDef = new StructureDefinition_1.default({
            uid: __classPrivateFieldGet(this, _a, "m", _StructureDefinitionFactory_createID).call(this),
            id: tgObject.id || "",
            name: tgObject.name || "",
            description: tgObject.description || "",
            languages: tgObject.languages || [],
            languageContexts: tgObject.languageContexts || [],
            converters: prepConverters,
            validators: prepValidators,
            version: tgObject.version || .1,
        });
        return structDef;
    }
}
exports.default = StructureDefinitionFactory;
_a = StructureDefinitionFactory, _StructureDefinitionFactory_createID = function _StructureDefinitionFactory_createID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
//# sourceMappingURL=StructureDefinitionFactory.js.map