import type { Settings } from "./defaults";
import { isInputElement, isOfType } from "./textField";

/**
 * Checks if the current selection is valid based on settings and container.
 * @param {Settings} settings - The user settings object.
 * @param {string} selected - The selected text.
 * @param {Element | null} container - The container element of the selection.
 * @returns {boolean} True if the selection is valid, false otherwise.
 */
export function isValidSelection(
  settings: Settings,
  selected: string,
  container: Element | null,
): boolean {
  if (isEmptyString(selected)) {
    return false;
  }

  if (container) {
    if (isInputElement(container)) {
      if (
        !settings.allowInInputs ||
        (isOfType(container, 'password') && !settings.allowInPasswords)
      ) {
        return false;
      }
    }

    if (container.tagName === 'TEXTAREA' && !settings.allowInTextareas) {
      return false;
    }

    if (
      container.closest('[contenteditable]') &&
      !settings.allowInContenteditable
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if a string is empty or undefined after trimming.
 * @param {string | undefined} string - The string to check.
 * @returns {boolean} True if the string is empty, false otherwise.
 */
function isEmptyString(string: string | undefined): boolean {
  return !string?.trim().length;
}
