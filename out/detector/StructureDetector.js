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
var _StructureDetector_instances, _StructureDetector_tgValue, _StructureDetector_language, _StructureDetector_languageContext, _StructureDetector_fileDetails, _StructureDetector_strategies, _StructureDetector_reason, _StructureDetector_userSettings, _StructureDetector_matchQualifications, _StructureDetector_configureMeta;
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = require("../structures/definitions");
const StructureDetectionStrategy_1 = require("./StructureDetectionStrategy");
const StructureDefinitionFactory_1 = require("../structures/StructureDefinitionFactory");
class StructureDetector {
    constructor(extensionSettings) {
        _StructureDetector_instances.add(this);
        _StructureDetector_tgValue.set(this, "");
        _StructureDetector_language.set(this, "");
        _StructureDetector_languageContext.set(this, "");
        _StructureDetector_fileDetails.set(this, null);
        _StructureDetector_strategies.set(this, void 0);
        _StructureDetector_reason.set(this, '');
        _StructureDetector_userSettings.set(this, void 0);
        __classPrivateFieldSet(this, _StructureDetector_userSettings, extensionSettings, "f");
        __classPrivateFieldSet(this, _StructureDetector_strategies, new StructureDetectionStrategy_1.default(), "f");
    }
    get reason() {
        return __classPrivateFieldGet(this, _StructureDetector_reason, "f");
    }
    detect(structValue, structMeta) {
        __classPrivateFieldSet(this, _StructureDetector_tgValue, structValue, "f");
        __classPrivateFieldGet(this, _StructureDetector_instances, "m", _StructureDetector_configureMeta).call(this, structMeta);
        const potentiallyStructs = [];
        for (let defInd in definitions_1.default) {
            const structDefInfo = definitions_1.default[defInd];
            const qualificationPriority = __classPrivateFieldGet(this, _StructureDetector_instances, "m", _StructureDetector_matchQualifications).call(this, structDefInfo);
            const structDef = StructureDefinitionFactory_1.default.createFromObject(structDefInfo);
            if (qualificationPriority >= 0) {
                if (!Array.isArray(potentiallyStructs[qualificationPriority])) {
                    potentiallyStructs[qualificationPriority] = [];
                }
                potentiallyStructs[qualificationPriority].push(structDef);
            }
        }
        if (potentiallyStructs.length === 0) {
            __classPrivateFieldSet(this, _StructureDetector_reason, "Not found potentially structs", "f");
            return "";
        }
        for (const structCollInd in potentiallyStructs) {
            for (const structInd in potentiallyStructs[structCollInd]) {
                const tgStructDef = potentiallyStructs[structCollInd][structInd];
                for (const validatorDef of tgStructDef.validators) {
                    const validationRes = validatorDef.validate(structValue);
                    if (validationRes.passed) {
                        return tgStructDef.id;
                    }
                }
            }
        }
        __classPrivateFieldSet(this, _StructureDetector_reason, "No struct matched", "f");
        return "";
    }
}
exports.default = StructureDetector;
_StructureDetector_tgValue = new WeakMap(), _StructureDetector_language = new WeakMap(), _StructureDetector_languageContext = new WeakMap(), _StructureDetector_fileDetails = new WeakMap(), _StructureDetector_strategies = new WeakMap(), _StructureDetector_reason = new WeakMap(), _StructureDetector_userSettings = new WeakMap(), _StructureDetector_instances = new WeakSet(), _StructureDetector_matchQualifications = function _StructureDetector_matchQualifications(structDef) {
    if (__classPrivateFieldGet(this, _StructureDetector_language, "f") === "" && __classPrivateFieldGet(this, _StructureDetector_languageContext, "f") === "") {
        return -1;
    }
    if (structDef.languages.length === 0) {
        return -1;
    }
    const langIndex = structDef.languages.indexOf(__classPrivateFieldGet(this, _StructureDetector_language, "f"));
    const langContextIndex = structDef.languageContexts.indexOf(__classPrivateFieldGet(this, _StructureDetector_languageContext, "f"));
    const mimeIndex = typeof __classPrivateFieldGet(this, _StructureDetector_fileDetails, "f")?.mimeType === "string" ? structDef.preferredMimes.indexOf(__classPrivateFieldGet(this, _StructureDetector_fileDetails, "f").mimeType) : -1;
    let totalQualification = -1;
    if (__classPrivateFieldGet(this, _StructureDetector_userSettings, "f")?.validateUncoveredStructures) {
        totalQualification += 1;
    }
    if (langIndex <= -1 && langContextIndex <= -1 && mimeIndex <= -1) {
        return totalQualification;
    }
    if (langIndex > -1) {
        totalQualification += (structDef.languages.length - langIndex) * 2;
    }
    if (langContextIndex > -1) {
        totalQualification += langContextIndex;
    }
    if (mimeIndex > -1) {
        totalQualification += mimeIndex;
    }
    return totalQualification;
}, _StructureDetector_configureMeta = function _StructureDetector_configureMeta(structMeta) {
    if (typeof structMeta.language === "string") {
        __classPrivateFieldSet(this, _StructureDetector_language, structMeta.language, "f");
    }
    else {
        __classPrivateFieldSet(this, _StructureDetector_language, "", "f");
    }
    if (typeof structMeta.languageContext === "string") {
        __classPrivateFieldSet(this, _StructureDetector_languageContext, structMeta.languageContext, "f");
    }
    else {
        __classPrivateFieldSet(this, _StructureDetector_languageContext, "", "f");
    }
    if (typeof structMeta.fileDetails === "object") {
        __classPrivateFieldSet(this, _StructureDetector_fileDetails, structMeta.fileDetails, "f");
    }
    else {
        __classPrivateFieldSet(this, _StructureDetector_fileDetails, null, "f");
    }
};
//# sourceMappingURL=StructureDetector.js.map