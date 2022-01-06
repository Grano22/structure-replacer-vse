export default class XMLStruct {
    public static stringify(obj: Record<string, any>, options: Record<string, any> = {}) : string {
        options = Object.assign({ startDepth:0 }, options);
        let xmlStr = '';
        if (options.startDepth === 0) {
            xmlStr += '<?xml version="1.0" encoding="UTF-8"?>\n';
        }
        const objKeys = Object.keys(obj) as string[];
        for(const objKeyInd in objKeys) {
            const objProp = objKeys[objKeyInd];
            if(typeof obj[objProp] === "object") {
                // TODO if matched signature -> if () {
                //    this.toMatchedSignature(obj[objProp], options);
                // }
                xmlStr += this.makeTagSpace(options.startDepth) + '<' + objProp + '>\n' + 
                this.stringify(obj[objProp], { startDepth:options.startDepth + 1 }) + '\n' + 
                this.makeTagSpace(options.startDepth) + '</' + objProp + '>\n';
            } else {
                xmlStr += this.makeTagSpace(options.startDepth) + '<' + objProp + '>\n'+ 
                this.makeValueSpace(options.startDepth) + obj[objProp] + '\n' +
                this.makeTagSpace(options.startDepth) + '</' + objProp + '>\n';
            }
        }
        return xmlStr;
    }

    static makeTagSpace(depth : number) : string {
        return " ".repeat(depth);
    }

    static makeValueSpace(depth : number) : string {
        return " ".repeat(depth + 3);
    }
}