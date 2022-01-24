/**
 * Structure replacer visual studio code extension
 * Copyright (C) 2021 Grano22 (BSD3 License)
 * 
 * @package StructureReplacerExtension
 * @author Adrian Błasiak <grano22@outlook.com>
 */

import * as vscode from 'vscode';
import StructureDetector from './detector/StructureDetector';
import subactionSelector from './gui/dialog/subactionSelector';
import items, { ConvertToActionQuickPickItem } from './gui/quickPickMenu/items';
import StructuresDefinitionManager from './managers/StructuresDefinitionManager';
import ToSQLTableDefinitionStructureConverter from "./converter/fromCurrLang/ToSQLTableDefinitionStructureConveter";
import ToJSONStructureConverter from './converter/fromCurrLang/ToJSONStructureConverter';
import ToYMLStructureConverter from './converter/fromCurrLang/ToYMLStructureConverter';
import ToPHPArrayStructureConverter from './converter/fromCurrLang/ToPHPArrayStructureConverter';
import SidepanelMenuProivder from './gui/sidepanel/SidepanelMenuProvider';
import DataReplacerExtensionFasade from './fasades/DataReplacerExtensionFasade';
import ToXMLStructureConverter from './converter/fromCurrLang/ToXMLStructureConverter';
import ToURLEncodedParamsStructureConverter from './converter/fromCurrLang/ToURLEncodedParamsStructureConverter';

export async function activate(context: vscode.ExtensionContext) {
	const extensionSettings : ExtensionSettings = vscode.workspace.getConfiguration('vestibule-bs') as ExtensionSettings;
	const structMng = new StructuresDefinitionManager({
		allowedStructures:[],
		disallowedStructures:[],
		nativeLangConverters:[
			new ToJSONStructureConverter(),
			new ToPHPArrayStructureConverter(),
			new ToYMLStructureConverter(),
			new ToSQLTableDefinitionStructureConverter(),
			new ToURLEncodedParamsStructureConverter(),
			new ToXMLStructureConverter()
		]
	}),
	extAccessor = new DataReplacerExtensionFasade(
		structMng,
		extensionSettings
	);

	const disposable : Record<string, any> = {}, sidebarProvider = new SidepanelMenuProivder(context.extensionUri, extAccessor);

	disposable["SidebarStructuresMenu"] = vscode.window.registerWebviewViewProvider(SidepanelMenuProivder.viewType, sidebarProvider);

	disposable["ReplaceDataStruct"] = vscode.commands.registerCommand('data_replacer.replace_data_structure', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		
		var selection = editor.selection;
		var selectedAllRange = editor.document.getText(selection);

		if (selectedAllRange.length <= 0) {
			vscode.window.showInformationMessage('Any text required to detect data structure');
			return;
		}

		const structureDetector = new StructureDetector(extensionSettings);
		const structureID = structureDetector.detect(selectedAllRange, {
			language: editor.document.languageId
		});

		if (structureID === '') {
			vscode.window.showErrorMessage('Source structure cannot be matched. ' + structureDetector.reason);
			return;
		}

		const allItems = items as ConvertToActionQuickPickItem[];

		vscode.window.showQuickPick(
			allItems,
			{
				title: 'Select target structure',
				placeHolder: 'Select a subaction'
			}

		).then(selectedOutputStruct => {
			const tgStruct = selectedOutputStruct?.id || '';

			if(tgStruct === '') {
				vscode.window.showInformationMessage(`Target structure is invalid`);
				return;
			}

			/*if(tgStruct === structureID) {
				vscode.window.showInformationMessage(`Structure cannot be converted due is already ${structureID}`);
				return;
			}*/

			const outputStruct = structMng.convertTo(selectedAllRange, structureID, tgStruct, selectedOutputStruct?.convertionOptions);
			if (structMng.hasErrors) {
				vscode.window.showErrorMessage(`Failed to convert from ${structureID} to ${tgStruct} structure type due to ${structMng.errors.join("\n")}`);
			} else {
				editor?.edit(editorBuilder => {
					editorBuilder.replace(selection, outputStruct);
				});
			}
		});
	});

	disposable["GenerateFileWithDataStruct"] = vscode.commands.registerCommand('data_replacer.generate_file_data_structure', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		
		var selection = editor.selection;
		var selectedAllRange = editor.document.getText(selection);

		if (selectedAllRange.length <= 0) {
			vscode.window.showInformationMessage('Any text required to detect data structure');
			return;
		}

		const structureDetector = new StructureDetector(extensionSettings);
		const structureID = structureDetector.detect(selectedAllRange, {
			language: editor.document.languageId
		});

		if (structureID === '') {
			vscode.window.showErrorMessage('Source structure cannot be matched. ' + structureDetector.reason);
			return;
		}

		const allItems = items as ConvertToActionQuickPickItem[];

		vscode.window.showQuickPick(
			allItems,
			{
				title: 'Select target structure',
				placeHolder: 'Select a subaction'
			}

		).then(async selectedOutputStruct => {
			const tgStruct = selectedOutputStruct?.id || '';

			if(tgStruct === '') {
				vscode.window.showInformationMessage(`Target structure is invalid`);
				return;
			}

			/*if(tgStruct === structureID) {
				vscode.window.showInformationMessage(`Structure cannot be converted due is already ${structureID}`);
				return;
			}*/

			const outputStruct = structMng.convertTo(selectedAllRange, structureID, tgStruct, selectedOutputStruct?.convertionOptions);
			if (structMng.hasErrors) {
				vscode.window.showErrorMessage(`Failed to convert from ${structureID} to ${tgStruct} structure type due to ${structMng.errors.join("\n")}`);
			} else {
				const newDocTab = await vscode.workspace.openTextDocument({
					language:selectedOutputStruct?.extension || 'txt',
					content:outputStruct
				});
				vscode.window.showTextDocument(newDocTab);
			}
		});
	});

	disposable['ValidateDataStruct'] = vscode.commands.registerCommand('data_replacer.validate_data_structure', () => {
		var editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		var selection = editor.selection;
		var selectedAllRange = editor.document.getText(selection);

		if (selectedAllRange.length <= 0) {
			vscode.window.showInformationMessage('Any text required to detect data structure');
			return;
		}
		
		const allItems = items as ConvertToActionQuickPickItem[];

		vscode.window.showQuickPick(
			allItems,
			{
				title: 'Select target structure',
				placeHolder: 'Select a subaction'
			}

		).then(async selectedValidationTypeStruct => {
			const tgStruct = selectedValidationTypeStruct?.id || '';

			if(tgStruct === '') {
				vscode.window.showInformationMessage(`Target structure is invalid`);
				return;
			}

			const tgDefinition = structMng.getDefinition(tgStruct), structValidators = tgDefinition?.validators;
			if(Array.isArray(structValidators)) {
				for (const structValidator of structValidators) {
					structValidator.validate(selection);
				}
			}
		});
	});

	disposable['SortDataStruct'] = vscode.commands.registerCommand('data_replacer.sort_alphanumerical_data_structure', () => {
		var editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		var selection = editor.selection;
		var selectedAllRange = editor.document.getText(selection);

		if (selectedAllRange.length <= 0) {
			vscode.window.showInformationMessage('Any text required to data structure operation');
			return;
		}

		const structureDetector = new StructureDetector(extensionSettings);
		const structureID = structureDetector.detect(selectedAllRange, {
			language: editor.document.languageId
		});

		if (structureID === '') {
			vscode.window.showErrorMessage('Source structure cannot be matched. ' + structureDetector.reason);
			return;
		}

		const outputStruct = structMng.convertToCurrLang(selectedAllRange, structureID);
		if (outputStruct === null || structMng.hasErrors) {
			vscode.window.showErrorMessage(`Failed to convert from ${structureID} to ${StructuresDefinitionManager.currLangConvertId} structure type due to ${structMng.errors.join("\n")}`);
			return;
		}

		const sortedOutputStruct = structMng.sort(outputStruct);

		const sortedStruct = structMng.convertFromCurrLang(sortedOutputStruct, structureID);

		if (sortedStruct === '') {
			vscode.window.showErrorMessage('Failed to sort data structure.');
			return;
		}

		editor?.edit(editorBuilder => {
			editorBuilder.replace(selection, sortedStruct);
		});
	});

	for (const disposableEvent in disposable) {
		context.subscriptions.push(disposable[disposableEvent]);
	}
}

export function deactivate() {

}