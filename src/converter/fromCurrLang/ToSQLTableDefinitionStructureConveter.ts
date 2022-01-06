import CurrentLangStructurePartialConverter from "./CurrentLangStructurePartialConverter";

export default class ToSQLTableDefinitionStructureConverter extends CurrentLangStructurePartialConverter {
    readonly name = "sqlTableDefinition";
    
    public convert(objStruct : Record<string, any>, options: Record<string, any>) {
        
    }
}