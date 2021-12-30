import Structure from "../structures/Structure";

export interface StructureParserOptions {

}

export default abstract class AbstractStructureParser {
    #exceptions = [];

    public abstract parse(tgStr : string, config : StructureParserOptions): Structure;
}