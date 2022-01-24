import CurrentLangStructurePartialConverter from "./CurrentLangStructurePartialConverter";


export default class ToURLEncodedParamsStructureConverter extends CurrentLangStructurePartialConverter
{
    readonly name = "urlEncodedParams";

    public convert(objStruct : Record<string, any>, options: Record<string, any>)
    {
        const params = [];
        for(const [ paramName, paramValue ] of Object.entries(objStruct))
        {
            params.push(
                `${encodeURIComponent(paramName)}=${encodeURIComponent(typeof paramValue === "object" ? JSON.stringify(paramValue) : paramValue)}`
            );
        }
        return params.join("&");
    }
}