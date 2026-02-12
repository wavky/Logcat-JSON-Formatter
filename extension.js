const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('log-formatter.formatLog', async function () {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('没有打开的编辑器');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;

        let text;
        let range;

        if (selection.isEmpty) {
            text = document.getText();
            range = new vscode.Range(
                document.positionAt(0),
                document.positionAt(text.length)
            );
        } else {
            text = document.getText(selection);
            range = selection;
        }

        try {
            const lines = text.split('\n');
            if (lines.length === 0) {
                return;
            }

            // Find JSON start position from first line
            const firstLine = lines[0];
            const braceIndex = firstLine.indexOf('{');
            const bracketIndex = firstLine.indexOf('[');
            let jsonStartIndex;
            if (braceIndex === -1) {
                jsonStartIndex = bracketIndex;
            } else if (bracketIndex === -1) {
                jsonStartIndex = braceIndex;
            } else {
                jsonStartIndex = Math.min(braceIndex, bracketIndex);
            }

            if (jsonStartIndex === -1) {
                vscode.window.showErrorMessage('第一行中没有找到 JSON 起始符号 { 或 [');
                return;
            }

            // Remove prefix and join into single line
            const cleanedLines = lines.map(line => {
                return line.length > jsonStartIndex ? line.substring(jsonStartIndex) : line;
            });
            const cleanedText = cleanedLines.join('');

            // Replace text
            await editor.edit(editBuilder => {
                editBuilder.replace(range, cleanedText);
            });

            // Set language to JSON and format
            await vscode.languages.setTextDocumentLanguage(document, 'json');
            await new Promise(resolve => setTimeout(resolve, 100));

            await vscode.commands.executeCommand('extension.prettyJSON');
            vscode.window.showInformationMessage('格式化完成');

        } catch (error) {
            vscode.window.showErrorMessage('格式化失败: ' + error.message);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
