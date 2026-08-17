import { browser } from 'wxt/browser';
import { Settings } from '@/utils/defaults';
import { BACKGROUND } from '@/utils/constants';
import { isTextField } from '@/utils/textField';
import { isValidSelection } from '@/utils/validation';
import { isInputElement, isOfType } from '@/utils/textField';
import { type Response } from '@/entrypoints/background';
import { hostId, renderButton, removeButtonHost } from './copyButton';

let selected: string, selection: Selection | null, container: Element | null;

/**
 * Captures the current text selection and determines the container element.
 */
export function onSelect() {
  selection = document.getSelection();
  selected = selection?.toString() ?? '';

  if (isTextField(document.activeElement)) {
    container = document.activeElement;
  } else {
    const node = selection?.anchorNode;

    container =
      node?.nodeType === Node.TEXT_NODE
        ? node.parentElement
        : (node as Element);
  }
}

/**
 * Handles the end of a selection event, either copying text or rendering a button based on settings.
 * @param {Settings} settings - The user settings object.
 * @param {MouseEvent} ev - The mouse event that triggered the selection end.
 */
export async function onSelectEnd(settings: Settings, ev: MouseEvent) {
  if (isValidSelection(settings, selected, container)) {
    if (
      settings.allowInInputs &&
      isInputElement(container) &&
      isOfType(container, 'password') &&
      settings.allowInPasswords
    ) {
      selected = container.value;
    }

    if (settings.mode === 'onSelect') {
      const response: Response = await browser.runtime.sendMessage({
        type: BACKGROUND.MSG_TYPE,
        text: getSelected(),
      });

      if (response.result === 'error') {
        console.log(response.message);
      }
    } else if (settings.mode === 'floatingButton') {
      document.getElementById(hostId) == null && renderButton(ev);
    }
  }

  settings.mode === 'onSelect' && resetSelected();
}

/**
 * Returns the currently selected text.
 * @returns {string} The selected text.
 */
export function getSelected(): string {
  return selected;
}

/**
 * Returns the current Selection object.
 * @returns {Selection | null} The selection object or null if none.
 */
export function getSelection(): Selection | null {
  return selection;
}

/**
 * Resets the stored selected text to an empty string.
 */
export function resetSelected(): void {
  selected = '';
}

/**
 * Removes all ranges from the current selection and resets input field selections.
 */
export function resetSelection(): void {
  selection && selection.removeAllRanges();

  if (container && isTextField(container)) {
    const field = container as HTMLInputElement;
    field.selectionStart = field.selectionEnd;
  }
}

/**
 * Reset selection state and remove the floating button from the page.
 */
export function clean() {
  resetSelected();
  resetSelection();
  removeButtonHost();
}
