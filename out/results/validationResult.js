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
var _ValidationResult_exceptions, _ValidationResult_registerDatetime, _ValidationResult_validationDuration, _ValidationResult_params;
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../throwable/Exception");
const ReportError_1 = require("../throwable/ReportError");
const TypeReportError_1 = require("../throwable/TypeReportError");
class ValidationResult {
    constructor(initialExceptions = []) {
        _ValidationResult_exceptions.set(this, []);
        _ValidationResult_registerDatetime.set(this, void 0);
        _ValidationResult_validationDuration.set(this, -1);
        _ValidationResult_params.set(this, new Map());
        __classPrivateFieldSet(this, _ValidationResult_registerDatetime, new Date(), "f");
        this.addExceptions(...initialExceptions);
    }
    get passed() {
        return __classPrivateFieldGet(this, _ValidationResult_exceptions, "f").length === 0;
    }
    get isValid() {
        return __classPrivateFieldGet(this, _ValidationResult_exceptions, "f").length === 0;
    }
    get registerDatetime() {
        return __classPrivateFieldGet(this, _ValidationResult_registerDatetime, "f");
    }
    get validationDuration() {
        return __classPrivateFieldGet(this, _ValidationResult_validationDuration, "f");
    }
    get exceptions() {
        return __classPrivateFieldGet(this, _ValidationResult_exceptions, "f");
    }
    setValidationDuration(duration = 0) {
        if (__classPrivateFieldGet(this, _ValidationResult_validationDuration, "f") === -1 && duration > 0) {
            __classPrivateFieldSet(this, _ValidationResult_validationDuration, duration, "f");
        }
    }
    addExceptions(...exceptions) {
        for (const exception of exceptions) {
            if (!(exception instanceof Exception_1.default || exception instanceof ReportError_1.default)) {
                __classPrivateFieldGet(this, _ValidationResult_exceptions, "f").push(TypeReportError_1.default.byComparing(exception, Exception_1.default));
            }
            else {
                __classPrivateFieldGet(this, _ValidationResult_exceptions, "f").push(exception);
            }
        }
    }
    setParam(name, value) {
        __classPrivateFieldGet(this, _ValidationResult_params, "f").set(name, value);
        return this;
    }
    getParam(name) {
        return __classPrivateFieldGet(this, _ValidationResult_params, "f").has(name) ? __classPrivateFieldGet(this, _ValidationResult_params, "f").get(name) : null;
    }
    [(_ValidationResult_exceptions = new WeakMap(), _ValidationResult_registerDatetime = new WeakMap(), _ValidationResult_validationDuration = new WeakMap(), _ValidationResult_params = new WeakMap(), Symbol.toPrimitive)](hint) {
        return this.passed;
    }
    valueOf() {
        return this.passed;
    }
    toString() {
        return this.passed ? 'Passed' : '';
    }
}
exports.default = ValidationResult;
//# sourceMappingURL=validationResult.js.map