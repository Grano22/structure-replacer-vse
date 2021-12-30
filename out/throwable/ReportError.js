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
var _ReportError_message, _ReportError_code, _ReportError_fileName, _ReportError_lineNumber;
Object.defineProperty(exports, "__esModule", { value: true });
class ReportError extends Error {
    constructor(code, message) {
        super();
        _ReportError_message.set(this, void 0);
        _ReportError_code.set(this, void 0);
        _ReportError_fileName.set(this, void 0);
        _ReportError_lineNumber.set(this, void 0);
        __classPrivateFieldSet(this, _ReportError_message, message, "f");
        __classPrivateFieldSet(this, _ReportError_code, code, "f");
        __classPrivateFieldSet(this, _ReportError_fileName, "", "f");
        __classPrivateFieldSet(this, _ReportError_lineNumber, 0, "f");
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ReportError);
        }
    }
    get message() {
        return __classPrivateFieldGet(this, _ReportError_message, "f");
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return __classPrivateFieldGet(this, _ReportError_code, "f");
    }
    getFile() {
        return __classPrivateFieldGet(this, _ReportError_fileName, "f");
    }
    getLine() {
        return __classPrivateFieldGet(this, _ReportError_lineNumber, "f");
    }
    getTrace() {
        return [];
    }
    getTraceAsSring() {
        return this.getTrace().join();
    }
    getPrevious() {
        return null;
    }
    toString() {
        return this.message;
    }
    valueOf() {
        return this.message;
    }
}
exports.default = ReportError;
_ReportError_message = new WeakMap(), _ReportError_code = new WeakMap(), _ReportError_fileName = new WeakMap(), _ReportError_lineNumber = new WeakMap();
//# sourceMappingURL=ReportError.js.map