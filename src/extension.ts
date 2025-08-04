import * as vscode from 'vscode';

/** Array of timestamps for escape key presses. */
let escapePressTimes: number[] = [];

/** Timeout for enabling autocomplete. */
let enableTimeout: NodeJS.Timeout | null = null;

/**
 * Activates the extension.
 * @param context The extension context.
 */
export function activate(context: vscode.ExtensionContext) {
    // Register the command that will be triggered by the keybinding
    const disposable = vscode.commands.registerCommand('ai-autocomplete-rage-disable.handleEscape', () => {
        handleEscapePress();
    });

    context.subscriptions.push(disposable);
}

/** Gets the configuration values. */
function getConfig() {
    const config = vscode.workspace.getConfiguration('aiAutocompleteRage');
    return {
        escapeKeypressCount: config.get<number>('escapeKeypressCount', 5),
        disableTimeoutMs: (config.get<number>('disableTimeoutSeconds', 20)) * 1000,
        enableTimeoutMs: (config.get<number>('enableTimeoutSeconds', 120)) * 1000
    };
}

/** Handles the escape key press. */
async function handleEscapePress() {
    const now = Date.now();
    const { escapeKeypressCount, disableTimeoutMs } = getConfig();
    
    escapePressTimes.push(now);
    
    // Remove timestamps older than our time window
    escapePressTimes = escapePressTimes.filter(time => now - time <= disableTimeoutMs);
    
    // Check if we have enough presses within the time window
    if (escapePressTimes.length >= escapeKeypressCount) {
		await disableWindsurfAutocomplete();
        escapePressTimes = [];
    }
}

/** Disables Windsurf autocomplete. */
async function disableWindsurfAutocomplete() {
    // Clear any existing timeout
    clearEnableTimeout();

    // Set timeout to re-enable autocomplete
    const { enableTimeoutMs } = getConfig();
    enableTimeout = setTimeout(() => {
        enableWindsurfAutocomplete();
    }, enableTimeoutMs);

    // Disable autocomplete
    await vscode.commands.executeCommand('windsurf.snoozeAutocomplete');
    vscode.window.showInformationMessage(`AI Autocomplete: Rage disabled Windsurf autocomplete`);
}

/** Enables Windsurf autocomplete. */
async function enableWindsurfAutocomplete() {
    clearEnableTimeout();
    await vscode.commands.executeCommand('windsurf.cancelSnoozeAutocomplete');
    vscode.window.showInformationMessage(`AI Autocomplete: Enabled Windsurf autocomplete`);
}

/** Clears the enable timeout. */
function clearEnableTimeout() {
    if (enableTimeout) {
        clearTimeout(enableTimeout);
        enableTimeout = null;
    }
}
