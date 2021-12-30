import Exception from "./Exception";

export default class AnnonymousException extends Exception {
    constructor(message: string) {
        super(message);
    }
}