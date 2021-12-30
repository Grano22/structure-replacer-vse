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
var _AbstractStructureValidator_instances, _AbstractStructureValidator_id, _AbstractStructureValidator_snapshoots, _AbstractStructureValidator_validationData, _AbstractStructureValidator_clearValidation;
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../throwable/Exception");
class AbstractStructureValidator {
    constructor() {
        _AbstractStructureValidator_instances.add(this);
        _AbstractStructureValidator_id.set(this, -1);
        _AbstractStructureValidator_snapshoots.set(this, []);
        //#currentSnapshoot : StructureValidationSnapshoot | null = null;
        _AbstractStructureValidator_validationData.set(this, null);
        const validatorOrigin = this.constructor;
        validatorOrigin.activeValidators.push(this);
        __classPrivateFieldSet(this, _AbstractStructureValidator_id, validatorOrigin.getLastID(), "f");
    }
    static getLastID() {
        return this.activeValidators.length - 1;
    }
    get id() {
        return __classPrivateFieldGet(this, _AbstractStructureValidator_id, "f");
    }
    validate(tgStruct, options = {}) {
        __classPrivateFieldSet(this, _AbstractStructureValidator_validationData, this.getDefaultValidationData(), "f");
        const startDatetime = new Date();
        const res = this.validationModel(tgStruct, options);
        const endDatetime = new Date();
        __classPrivateFieldGet(this, _AbstractStructureValidator_snapshoots, "f").push({
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            validatorRef: __classPrivateFieldGet(this, _AbstractStructureValidator_id, "f"),
            result: res,
            data: this.getValidationAllData()
        });
        res.setValidationDuration(Math.abs(endDatetime.getTime() - startDatetime.getTime()));
        return res;
    }
    shortValidate(tgStruct, options = {}) {
        __classPrivateFieldSet(this, _AbstractStructureValidator_validationData, this.getDefaultValidationData(), "f");
        const startDatetime = new Date();
        const res = this.shortValidationModel(tgStruct, options);
        const endDatetime = new Date();
        __classPrivateFieldGet(this, _AbstractStructureValidator_snapshoots, "f").push({
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            validatorRef: __classPrivateFieldGet(this, _AbstractStructureValidator_id, "f"),
            result: res,
            data: this.getValidationAllData()
        });
        res.setValidationDuration(Math.abs(endDatetime.getTime() - startDatetime.getTime()));
        return res;
    }
    getValidationData(optionName) {
        return __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") ? __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] || null : null;
    }
    getValidationAllData() {
        return __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f");
    }
    addValidationData(optionName, optionValue, optionKey = '') {
        try {
            if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === null) {
                throw new Exception_1.default("Validation data not initialised");
            }
            if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] === "undefined") {
                throw new Exception_1.default("Validation option with name " + optionName + " is not defined");
            }
            if (Array.isArray(__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName])) {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName].push(optionValue);
            }
            else if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] instanceof Map || __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] instanceof Set) {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName].set(optionKey, optionValue);
            }
            else if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === "object") {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName][optionKey] = optionValue;
            }
            else {
                throw new Exception_1.default("Type is not a collection");
            }
        }
        catch (exc) {
        }
    }
    updateValidationData(optionName, optionValue, optionKey = '') {
        try {
            if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === null) {
                throw new Exception_1.default("Validation data not initialised");
            }
            if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] === "undefined") {
                throw new Exception_1.default("Validation option with name " + optionName + " is not defined");
            }
            if (Array.isArray(__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName])) {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName].push(optionValue);
            }
            else if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] instanceof Map || __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] instanceof Set) {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName].set(optionKey, optionValue);
            }
            else if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === "object") {
                __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName][optionKey] = optionValue;
            }
            else {
                throw new Exception_1.default("Type is not a collection");
            }
        }
        catch (exc) {
        }
    }
    setValidationData(optionName, optionCB) {
        try {
            if (__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f") === null) {
                throw new Exception_1.default("Validation data is not initialized");
            }
            if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] === "undefined") {
                throw new Exception_1.default("Validation option " + optionName + " do not exists");
            }
            if (typeof optionCB !== "function") {
                throw new Exception_1.default("Callback expected");
            }
            const optionValue = optionCB(__classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName]);
            if (typeof __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] !== typeof optionValue) {
                throw new Exception_1.default("Validation option type is incorect");
            }
            //@ts-ignore
            __classPrivateFieldGet(this, _AbstractStructureValidator_validationData, "f")[optionName] = optionValue;
        }
        catch (exc) {
            console.error(exc);
        }
    }
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    cloneEmpty() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, {});
    }
}
exports.default = AbstractStructureValidator;
_AbstractStructureValidator_id = new WeakMap(), _AbstractStructureValidator_snapshoots = new WeakMap(), _AbstractStructureValidator_validationData = new WeakMap(), _AbstractStructureValidator_instances = new WeakSet(), _AbstractStructureValidator_clearValidation = function _AbstractStructureValidator_clearValidation() {
    __classPrivateFieldSet(this, _AbstractStructureValidator_validationData, null, "f");
};
AbstractStructureValidator.activeValidators = [];
AbstractStructureValidator.ERROR_MESSAGES = {};
//# sourceMappingURL=AbstractStructureValidator.js.map