import AbstractStructureValidator from "../validators/AbstractStructureValidator";

interface StructureDefinitionMeta {
    uid: string;
    id: string;
    name: string;
    description: string;
    version: string;
    languages: string[];
    languageContexts: string[];
    validators: AbstractStructureValidator<any>[];
    converters: any;
}

export default class StructureDefinition {
    #uid : string;
    #id: string;
    #name: string = '';
    #languageContexts : string[] = [];
    #languages: string[] = [];
    #validators: AbstractStructureValidator<any>[] = [];
    #converters : Record<string, any> = {};

    get uid() {
        return this.#uid;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get languageContexts() {
        return this.#languageContexts;
    }

    get languages() {
        return this.#languages;
    }

    get validators() {
        return this.#validators;
    }

    get converters() {
        return this.#converters;
    }

    constructor(configMeta : StructureDefinitionMeta) {
        this.#uid = configMeta.uid;
        this.#id = configMeta.id;
        this.#name = configMeta.name;
        this.#languageContexts = configMeta.languageContexts || [];
        this.#languages = configMeta.languages || [];
        this.#validators = configMeta.validators || [];
        this.#converters = configMeta.converters || {};
    }

    setName(name: string) {
        this.#name = name;
    }

    
}