import Structure from "../structures/Structure";
import AbstractStructureConverter from "./AbstractStructureConverter";


export default class SQLStructureConverter extends AbstractStructureConverter {
    protected toCurrLang(tgStruct: any): Record<any, any> | null {
        let tableInd = tgStruct.indexOf("table");
        if (tableInd <= -1) {
            tableInd = tgStruct.indexOf("TABLE");
        }
        const objFields : Record<string, any> = {};
        const sqlTableName = tgStruct.substring(tableInd, tgStruct.indexOf("("));
        objFields[sqlTableName] = {};
        const sqlFields = tgStruct.substr(tgStruct.indexOf('('), tgStruct.lastIndexOf(')')).split(",");
        for (const sqlField of sqlFields) {
            const [ sqlFieldName, sqlFieldTypeDecl ] = sqlField.split(/\s/);
            const [ sqlFieldType, sqlFieldSize ] = this.#getTypeAndSize(sqlFieldTypeDecl);

            objFields[sqlTableName][sqlFieldName] = {
                size:sqlFieldSize,
                type:sqlFieldType,
                default:null
            };
        }
        return {
            [sqlTableName]: objFields
        }
    }
    
    #getTypeAndSize(tgDeclaration : string) : [ string, number ] {
        const middlePoint = tgDeclaration.indexOf("(");
        if(middlePoint<=-1) {
            return [ tgDeclaration, 0 ];
        }
        return [
            tgDeclaration.substring(0, middlePoint),
            parseInt(tgDeclaration.substring(middlePoint, tgDeclaration.lastIndexOf(")")))
        ];
    }
}