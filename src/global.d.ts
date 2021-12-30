import { WorkspaceConfiguration } from "vscode";

declare global {
    export enum TokenType {
        Comment,
        String,
        Other
    }
      
    export interface TokenInformation {
        type: TokenType;
        range: Range; 
        languageId: string;
    }

    interface ExtensionSettings extends WorkspaceConfiguration {
        [key: string] : any;
        validateUncoveredStructures : boolean;
    }
}

export {};