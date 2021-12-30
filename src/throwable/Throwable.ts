export default interface Throwable {
    getMessage() : string;
    getCode() : number | string;
    getFile() : string;
    getLine() : number;
    getTrace() : Array<string>;
    getTraceAsSring() : string;
    getPrevious() : Throwable | null;
    toString() : string;
    valueOf() : any;
}