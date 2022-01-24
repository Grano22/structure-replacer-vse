import AbstractStructureConverter from "./AbstractStructureConverter";
import ConverterFlags from "./schema/ConverterFlags";

export default class URLEncodedParamsStructureConverter extends AbstractStructureConverter {
    static readonly flags = [
        ConverterFlags.Flat
    ];
    
    protected toCurrLang(tgStruct: string): Record<any, any> | null {
        const params = tgStruct.split("&"), structObj : Record<string, any> = {};
        for (const param of params) {
            const [ paramName, paramValue ] = param.split("=");
            if(paramName && paramValue) {
                structObj[decodeURIComponent(paramName)] = decodeURIComponent(paramValue);
            }
        }
        return structObj;
    }
}