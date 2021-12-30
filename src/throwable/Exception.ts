import Throwable from "./Throwable";

/**
 * @class
 * @classdesc Exception
 */
export default class Exception implements Throwable {
    protected message : string;
    protected code : number | string;
    protected fileName : string;
    protected lineNumber : number;

    /**
     * Create Exception
     * @since 1.0.0
     */
    constructor(message : string, code : number | string = -1, previous: Throwable | null = null) {
        this.message = message;
        this.code = code;

        if (
            typeof process !== 'undefined' &&
            typeof process.versions.node !== 'undefined'
        ) {
            this.fileName = __dirname; //new Error().stack.split('\n')[1].split('(')[1].split(')')[0];
        } else if (
            typeof window !== "undefined" &&
            typeof window["HTMLScriptElement"] !== "undefined"
        ) {
            const allScriptsTags = document.getElementsByTagName("script");
            this.fileName = allScriptsTags[allScriptsTags.length - 1].src;
        } else {
            this.fileName = "unknown";
        }

        this.lineNumber = -1;
    }

    public getMessage() : string {
        return this.message;
    }

    public getCode() : number | string {
        return this.code;
    }

    public getFile() : string {
        return this.fileName;
    }

    public getLine() : number {
        return this.lineNumber;
    }

    public getTrace() : Array<string> {
        return [];
    }

    public getTraceAsSring() : string {
        return this.getTrace().join();
    }

    public getPrevious() : Exception | null {
        return null;
    }

    public toString() : string {
        return this.message;
    }

    public valueOf() : string {
        return this.message;
    }
}