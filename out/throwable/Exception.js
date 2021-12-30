"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 * @classdesc Exception
 */
class Exception {
    /**
     * Create Exception
     * @since 1.0.0
     */
    constructor(message, code = -1, previous = null) {
        this.message = message;
        this.code = code;
        if (typeof process !== 'undefined' &&
            typeof process.versions.node !== 'undefined') {
            this.fileName = __dirname; //new Error().stack.split('\n')[1].split('(')[1].split(')')[0];
        }
        else if (typeof window !== "undefined" &&
            typeof window["HTMLScriptElement"] !== "undefined") {
            const allScriptsTags = document.getElementsByTagName("script");
            this.fileName = allScriptsTags[allScriptsTags.length - 1].src;
        }
        else {
            this.fileName = "unknown";
        }
        this.lineNumber = -1;
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return this.code;
    }
    getFile() {
        return this.fileName;
    }
    getLine() {
        return this.lineNumber;
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
exports.default = Exception;
//# sourceMappingURL=Exception.js.map