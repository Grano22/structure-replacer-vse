"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StructuresDefinitionManager_instances, _StructuresDefinitionManager_preloadedDefinitions, _StructuresDefinitionManager_loadedDefinitions, _StructuresDefinitionManager_exceptions, _StructuresDefinitionManager_config, _StructuresDefinitionManager_validateConfig, _StructuresDefinitionManager_loadDefinitions, _StructuresDefinitionManager_addException;
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractStructureConverter_1 = require("../converter/AbstractStructureConverter");
const CurrentLangStructureConverter_1 = require("../converter/CurrentLangStructureConverter");
const definitions_1 = require("../structures/definitions");
const StructureDefinitionFactory_1 = require("../structures/StructureDefinitionFactory");
const Exception_1 = require("../throwable/Exception");
const StructureConvertionException_1 = require("../throwable/StructureConvertionException");
class StructuresDefinitionManager {
    constructor(setup) {
        _StructuresDefinitionManager_instances.add(this);
        _StructuresDefinitionManager_preloadedDefinitions.set(this, new Map());
        _StructuresDefinitionManager_loadedDefinitions.set(this, new Map());
        _StructuresDefinitionManager_exceptions.set(this, []);
        __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_config).call(this, setup);
        __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_loadDefinitions).call(this, setup);
    }
    get errors() {
        return __classPrivateFieldGet(this, _StructuresDefinitionManager_exceptions, "f");
    }
    get hasErrors() {
        return __classPrivateFieldGet(this, _StructuresDefinitionManager_exceptions, "f").length > 0;
    }
    convertTo(tgValue, fromType, toType) {
        try {
            if (!__classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").has(fromType)) {
                throw new StructureConvertionException_1.default("Type converter " + fromType + " do not exists");
            }
            const tgStruct = __classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").get(fromType), tgConverter = tgStruct?.converters["*"];
            if (typeof tgConverter === "undefined" || tgConverter === null) {
                throw new StructureConvertionException_1.default("Structure " + fromType + " do not have any converters");
            }
            if (!(tgConverter instanceof AbstractStructureConverter_1.default)) {
                throw new StructureConvertionException_1.default("Structure " + fromType + " converter is invaild");
            }
            console.log(toType, fromType, tgConverter);
            if (tgConverter.canConvert(toType)) {
                return (tgConverter.convert(tgValue, toType) || '').toString();
            }
            else {
                const currLangConverter = new CurrentLangStructureConverter_1.default();
                if (!currLangConverter.canConvert(toType)) {
                    throw new StructureConvertionException_1.default("Structure " + fromType + " cannot be converted from native lang to " + toType);
                }
                const currLangResult = tgConverter.convert(tgValue, 'currLang');
                return (currLangConverter.convert(currLangResult, toType) || '').toString();
            }
        }
        catch (err) {
            if (err instanceof StructureConvertionException_1.default) {
                __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_addException).call(this, err);
            }
            return tgValue;
        }
    }
    getDefintionsNames() {
        return Array.from(__classPrivateFieldGet(this, _StructuresDefinitionManager_preloadedDefinitions, "f").keys());
    }
    getDefinition(id) {
        if (__classPrivateFieldGet(this, _StructuresDefinitionManager_preloadedDefinitions, "f").has(id)) {
            return __classPrivateFieldGet(this, _StructuresDefinitionManager_preloadedDefinitions, "f").get(id) || null;
        }
        if (__classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").has(id)) {
            return __classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").get(id) || null;
        }
        __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_addException).call(this, new Exception_1.default("Structure definition with id : " + id + " not found"));
        return null;
    }
}
exports.default = StructuresDefinitionManager;
_StructuresDefinitionManager_preloadedDefinitions = new WeakMap(), _StructuresDefinitionManager_loadedDefinitions = new WeakMap(), _StructuresDefinitionManager_exceptions = new WeakMap(), _StructuresDefinitionManager_instances = new WeakSet(), _StructuresDefinitionManager_config = function _StructuresDefinitionManager_config(setup) {
    const isValid = __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_validateConfig).call(this, setup);
    if (isValid) {
        __classPrivateFieldGet(this, _StructuresDefinitionManager_instances, "m", _StructuresDefinitionManager_loadDefinitions).call(this, setup);
    }
    else {
    }
}, _StructuresDefinitionManager_validateConfig = function _StructuresDefinitionManager_validateConfig(setup) {
    try {
        if (!Array.isArray(setup.allowedStructures)) {
            throw new Exception_1.default("allowedStructures must be an array");
        }
        if (!Array.isArray(setup.disallowedStructures)) {
            throw new Exception_1.default("disallowedStructures must be an array");
        }
        for (const structID in setup.allowedStructures) {
            if (setup.disallowedStructures.indexOf(structID) > -1) {
                throw new Exception_1.default("Disallowed structures ids for example : " + structID + " cannot be also allowed");
            }
        }
        return true;
    }
    catch (exc) {
        //this.#addException(exc);
        return false;
    }
}, _StructuresDefinitionManager_loadDefinitions = function _StructuresDefinitionManager_loadDefinitions(setup) {
    let definitionsToLoad = definitions_1.default.map(def => def.id || '');
    if (Array.isArray(setup.allowedStructures) && setup.allowedStructures.length > 0) {
        definitionsToLoad = definitionsToLoad.map(def => (setup.allowedStructures || []).includes(def) ? def : '');
    }
    for (const definitionInd in definitionsToLoad) {
        if (definitionsToLoad[definitionInd] !== '') {
            const tgDefinition = StructureDefinitionFactory_1.default.createFromObject(definitions_1.default[definitionInd]);
            __classPrivateFieldGet(this, _StructuresDefinitionManager_loadedDefinitions, "f").set(definitionsToLoad[definitionInd], tgDefinition);
        }
    }
}, _StructuresDefinitionManager_addException = function _StructuresDefinitionManager_addException(exc) {
    __classPrivateFieldGet(this, _StructuresDefinitionManager_exceptions, "f").push(exc);
};
//# sourceMappingURL=StructuresDefinitionManager.js.map