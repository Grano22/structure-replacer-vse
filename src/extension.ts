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

export function activate(context: vscode.ExtensionContext) {
	const extensionSettings : ExtensionSettings = vscode.workspace.getConfiguration('vestibule-bs') as ExtensionSettings;
	const structMng = new StructuresDefinitionManager({
		allowedStructures:[],
		disallowedStructures:[]
	});
	
	const disposableReplaceDataStruct = vscode.commands.registerCommand('data_replacer.replace_data_structure', () => {
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

			if(tgStruct === structureID) {
				vscode.window.showInformationMessage(`Structure cannot be converted due is already ${structureID}`);
				return;
			}

			const outputStruct = structMng.convertTo(selectedAllRange, structureID, tgStruct);
			if (structMng.hasErrors) {
				vscode.window.showErrorMessage(`Failed to convert from ${structureID} to ${tgStruct} structure type due to ${structMng.errors.join("\n")}`);
			} else {
				editor?.edit(editorBuilder => {
					editorBuilder.replace(selection, outputStruct);
				});
			}
		});
	});

	const disposableGenerateFileWithDataStruct = vscode.commands.registerCommand('data_replacer.generate_file_data_structure', () => {
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

			if(tgStruct === structureID) {
				vscode.window.showInformationMessage(`Structure cannot be converted due is already ${structureID}`);
				return;
			}

			const outputStruct = structMng.convertTo(selectedAllRange, structureID, tgStruct);
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

	context.subscriptions.push(disposableReplaceDataStruct);
	context.subscriptions.push(disposableGenerateFileWithDataStruct);
}

export function deactivate() {

}