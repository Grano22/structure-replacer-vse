import JSONStructureConverter from "../converter/JSONStructureConverter";
import PHPArrayStructureConverter from "../converter/PHPArrayStructureConverter";
import TextPairsStructureConverter from "../converter/TextPairsStructureConverter";
import URLEncodedParamsStructureConverter from "../converter/URLEncodedParamsStructureConverter";
import XMLStructureConverter from "../converter/XMLStructureConverter";
import YMLStructureConverter from "../converter/YMLStructureConverter";
import JSONStructureValidator from "../validators/JSONStructureValidator";
import PHPArrayStructureValidator from "../validators/PHPArrayStructureValidator";
import TextPairsStructureValidator from "../validators/TextPairsStructureValidator";
import XMLStructureValidator from "../validators/XMLStructureValidator";
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
    },
    {
        id:'XML',
        name:'XML',
        preferredMimes: ['application/xml', 'text/xml'],
        languageContexts: ['xml'],
        languages: ['xml'],
        validators: [
            XMLStructureValidator
        ],
        converters: {
            "*": XMLStructureConverter
        }
    },
    {
        id:'urlEncodedParams',
        name:'UrlEncodedParams',
        preferredMimes: ['application/x-www-form-urlencoded'],
        languageContexts: ['urlencoded'],
        languages: ['urlencoded'],
        validators: [

        ],
        converters: {
            "*": URLEncodedParamsStructureConverter
        }
    }
];