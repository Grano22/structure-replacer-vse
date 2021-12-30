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
var _StructureDefinition_uid, _StructureDefinition_id, _StructureDefinition_name, _StructureDefinition_languageContexts, _StructureDefinition_languages, _StructureDefinition_validators, _StructureDefinition_converters;
Object.defineProperty(exports, "__esModule", { value: true });
class StructureDefinition {
    constructor(configMeta) {
        _StructureDefinition_uid.set(this, void 0);
        _StructureDefinition_id.set(this, void 0);
        _StructureDefinition_name.set(this, '');
        _StructureDefinition_languageContexts.set(this, []);
        _StructureDefinition_languages.set(this, []);
        _StructureDefinition_validators.set(this, []);
        _StructureDefinition_converters.set(this, {});
        __classPrivateFieldSet(this, _StructureDefinition_uid, configMeta.uid, "f");
        __classPrivateFieldSet(this, _StructureDefinition_id, configMeta.id, "f");
        __classPrivateFieldSet(this, _StructureDefinition_name, configMeta.name, "f");
        __classPrivateFieldSet(this, _StructureDefinition_languageContexts, configMeta.languageContexts || [], "f");
        __classPrivateFieldSet(this, _StructureDefinition_languages, configMeta.languages || [], "f");
        __classPrivateFieldSet(this, _StructureDefinition_validators, configMeta.validators || [], "f");
        __classPrivateFieldSet(this, _StructureDefinition_converters, configMeta.converters || {}, "f");
    }
    get uid() {
        return __classPrivateFieldGet(this, _StructureDefinition_uid, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _StructureDefinition_id, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _StructureDefinition_name, "f");
    }
    get languageContexts() {
        return __classPrivateFieldGet(this, _StructureDefinition_languageContexts, "f");
    }
    get languages() {
        return __classPrivateFieldGet(this, _StructureDefinition_languages, "f");
    }
    get validators() {
        return __classPrivateFieldGet(this, _StructureDefinition_validators, "f");
    }
    get converters() {
        return __classPrivateFieldGet(this, _StructureDefinition_converters, "f");
    }
    setName(name) {
        __classPrivateFieldSet(this, _StructureDefinition_name, name, "f");
    }
}
exports.default = StructureDefinition;
_StructureDefinition_uid = new WeakMap(), _StructureDefinition_id = new WeakMap(), _StructureDefinition_name = new WeakMap(), _StructureDefinition_languageContexts = new WeakMap(), _StructureDefinition_languages = new WeakMap(), _StructureDefinition_validators = new WeakMap(), _StructureDefinition_converters = new WeakMap();
//# sourceMappingURL=StructureDefinition.js.map