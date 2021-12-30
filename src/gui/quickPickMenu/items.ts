import * as vscode from 'vscode';

export interface ConvertToActionQuickPickItem extends vscode.QuickPickItem {
    id : string;
    extension? : string;
    inherit? : string;
    convertionOptions?: Record<string, any>;
}

export default [
    // {
    //     id:'text-pair',
    //     label:'$(symbol-type-parameter) Text pair',
    //     description:'Convert structure to text pair structure',
    //     detail:'Text pair is a structure that contains two strings. It is used to store text pairs.',
    // },
    // {
    //     id:'jsObjectDeclaration',
    //     label:'$(symbol-object) JavaScript Object Declaration',
    //     description:'Convert structure to JavaScript Object Declaration',
    //     detail:'JavaScript Object Declaration is a structure that contains a JavaScript object declaration.',
    // },
    // {
    //     id:'php-object-declaration',
    //     label:'PHP Object Declaration',
    // },
    {
        id:'PHPArray',
        label:'$(notebook-mimetype) PHP Array',
        description:'Convert structure to PHP array',
        detail:'PHP array with squere brackets',
        extension:'php'
    },
    {
        id:'JSON',
        label:'$(symbol-object) JSON',
        description:'Convert structure to pretty JSON',
        detail:'Pretty-printed JSON',
        extension:'json'
    },
    {
        id:'JSON',
        label:'$(file-code) Minified JSON',
        description:'Convert structure to minified JSON',
        detail:'Minified JSON',
        extension:'json',
        convertionOptions:{
            space:0,
            replacer:null
        }
    },
    // {
    //     id:'BSON',
    //     label:'BSON',
    // },
    {
        id:'YAML',
        label:'$(symbol-constructor) YAML',
        extension:'yml'
    },
    // {
    //     id:'XML',
    //     label:'XML'
    // },
    // {
    //     id:'SQL',
    //     label:'SQL Bump',
    // },
    // {
    //     id:'html-table',
    //     label:'HTML table',
    // },
    // {
    //     id:'html-table-row',
    //     label:'HTML table (with header)'
    // },
    // {
    //     id:'html-definition-list',
    //     label:'HTML Definition List'
    // },
    // {
    //     id:'typescript-object-declaration',
    //     label:'TypeScript Object Declaration',
    // },
    // {
    //     id:'typescript-interface',
    //     label:'TypeScript Interface',
    // },
    // {
    //     id:'typescript-class',
    //     label:'TypeScript Class',
    // },
    // {
    //     id:'typescript-enum',
    //     label:'TypeScript Enum',
    // }

];