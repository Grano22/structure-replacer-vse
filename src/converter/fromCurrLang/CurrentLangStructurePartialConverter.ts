export default abstract class CurrentLangStructurePartialConverter {
    abstract readonly name: string;
    
    public abstract convert(objStruct : Record<string, any>, options: Record<string, any>): any; 
}