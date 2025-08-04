# ai-autocomplete-rage-disable README

Disable AI autocomplete automatically when pressing escape key multiple times.
NOTE: Currently doesn't work.
    The Windsurf IDE has a bug where 'windsurf.snoozeAutocomplete' is broken.
    Sent request 37778 for fix request (Windsurf is not open source).

## Features

Sometimes AI gets in the way with autocomplete if it can't guess your context easily.

This extension allows disabling autocomplete automatically when you've rage clicked escape to cancel the auto prompt X times.

Windsurf IDE has a 'disable for 10 minutes' button but the goal of this is to automate the process a bit more, typically you don't want to disable the autocomplete for 10 minute blocks.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `aiAutocompleteRage.escapeKeypressCount`: Number of escape key presses needed to trigger the disabling autocomplete
* `aiAutocompleteRage.disableTimeoutSeconds`: Timeout in seconds to count escape key presses to disable autocomplete
* `aiAutocompleteRage.enableTimeoutSeconds`: Timeout in seconds until autocomplete is re-enabled

## Release Notes

### 1.0.0

Initial release

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

**Enjoy!**
