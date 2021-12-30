import Exception from "../throwable/Exception";
import ReportError from "../throwable/ReportError";
import StructureValidationException from "../throwable/StructureValidationException";
import Throwable from "../throwable/Throwable";
import TypeReportError from "../throwable/TypeReportError";

export default class ValidationResult {
    #exceptions : Throwable[] = [];
    #registerDatetime : Date;
    #validationDuration : number = -1;
    #params : Map<string, any> = new Map();

    get passed() {
        return this.#exceptions.length === 0;
    }

    get isValid() {
        return this.#exceptions.length === 0;
    }

    get registerDatetime() {
        return this.#registerDatetime;
    }

    get validationDuration() {
        return this.#validationDuration;
    }

    get exceptions() {
        return this.#exceptions;
    }

    constructor(initialExceptions : Array<StructureValidationException> = []) {
        this.#registerDatetime = new Date();
        this.addExceptions(...initialExceptions);
    }

    setValidationDuration(duration : number = 0): void {
        if (this.#validationDuration === -1 && duration > 0) {
            this.#validationDuration = duration;
        }
    }

    public addExceptions(...exceptions : Throwable[]): void
    {
        for (const exception of exceptions)
        {
            if(!(exception instanceof Exception || exception instanceof ReportError)) {
                this.#exceptions.push(TypeReportError.byComparing(exception, Exception));
            } else {
                this.#exceptions.push(exception);
            }
        }
    }

    public setParam(name : string, value : any): this
    {
        this.#params.set(name, value);
        return this;
    }

    public getParam(name : string): any
    {
        return this.#params.has(name) ? this.#params.get(name) : null;
    }

    [Symbol.toPrimitive](hint : any)
    {
        return this.passed;
    }

    valueOf()
    {
        return this.passed;
    }

    toString() {
        return this.passed ? 'Passed' : '';
    }
}