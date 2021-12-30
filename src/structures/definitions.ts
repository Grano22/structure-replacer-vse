import JSONStructureConverter from "../converter/JSONStructureConverter";
import PHPArrayStructureConverter from "../converter/PHPArrayStructureConverter";
import TextPairsStructureConverter from "../converter/TextPairsStructureConverter";
import YMLStructureConverter from "../converter/YMLStructureConverter";
import JSONStructureValidator from "../validators/JSONStructureValidator";
import PHPArrayStructureValidator from "../validators/PHPArrayStructureValidator";
import TextPairsStructureValidator from "../validators/TextPairsStructureValidator";
import YMLStructureValidator from "../validators/YMLStructureValidator";

export interface StructureDefinitionEntry {
    id: string;
    name: string;
    description?: string;
    languages: string[];
    languageContexts: string[];
    prefferedMimes?: string[];
    validators: any[]; //new (...param : any) => AbstractStructureValidator AbstractStructureConverter
    converters: Record<string, any>;
}

export default [
    /*{
        id:'text-pair',
        name:'Text pair',
        languageContexts: [],
        languages: [],
        validators: [
            TextPairsStructureValidator
        ],
        converters: {
            '*': TextPairsStructureConverter
        },
    },*/
    {
        id:'JSON',
        name: 'JSON',
        preferredMimes : ['application/json'],
        languageContexts: ['json'],
        languages: ['json', 'javascript'],
        validators: [
            JSONStructureValidator
        ],
        converters: {
            '*': JSONStructureConverter
        }
    },
    {
        id:'YAML',
        name:'YML',
        preferredMimes: ['application/x-yaml', 'text/yaml'],
        languageContexts: ['yml'],
        languages: ['yaml', 'yml'],
        validators: [
            YMLStructureValidator
        ],
        converters: {
            '*': YMLStructureConverter
        }
    },
    {
        id:'PHPArray',
        name:'PHP Array',
        preferredMimes: ['application/x-httpd-php'],
        languageContexts: ['php'],
        languages: ['php'],
        validators: [
            PHPArrayStructureValidator
        ],
        converters: {
            '*': PHPArrayStructureConverter
        }
    }
];