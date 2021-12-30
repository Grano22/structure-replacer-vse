import Throwable from "./Throwable";

export default class ReportError extends Error implements Throwable {
    #message : string;
    #code : number;
    #fileName : string;
    #lineNumber : number;

    get message() : string
    {
        return this.#message;
    }

    constructor(code : number, message : string) {
        super();
        this.#message = message;
        this.#code = code;
        this.#fileName = "";
        this.#lineNumber = 0;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ReportError);
        }
    }

    public getMessage() : string {
        return this.message;
    }

    public getCode() : number | string {
        return this.#code;
    }

    public getFile() : string {
        return this.#fileName;
    }

    public getLine() : number {
        return this.#lineNumber;
    }

    public getTrace() : Array<string> {
        return [];
    }

    public getTraceAsSring() : string {
        return this.getTrace().join();
    }

    public getPrevious() : ReportError | null {
        return null;
    }

    public toString() : string {
        return this.message;
    }

    public valueOf() : string {
        return this.message;
    }
}