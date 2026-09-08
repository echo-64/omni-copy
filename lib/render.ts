import { UI_SELECTORS } from '@/utils/constants';
import type { Settings } from '@/utils/defaults';
import { getSetting } from './settings';

interface Ui {
  clipboard: HTMLDivElement;
  copyOnSelect: HTMLInputElement;
  floatingButton: HTMLInputElement;
  collect2FileBtn: HTMLInputElement;
  collectedCounter: HTMLSpanElement;
  openEditorLink: HTMLAnchorElement;
  preferenceInputs: HTMLInputElement;
  preferencePassword: HTMLInputElement;
  preferenceTextareas: HTMLInputElement;
  preferenceContenteditable: HTMLInputElement;
}

/**
 * Object containing references to key UI elements for settings management.
 */
export const ui: Ui = {
  clipboard: document.querySelector(UI_SELECTORS.CLIPBOARD) as HTMLDivElement,

  copyOnSelect: document.getElementById(
    UI_SELECTORS.COPY_ON_SELECT_ID,
  ) as HTMLInputElement,

  floatingButton: document.getElementById(
    UI_SELECTORS.FLOATING_BTN_ID,
  ) as HTMLInputElement,

  collect2FileBtn: document.getElementById(
    UI_SELECTORS.COLLECT_TO_FILE_ID,
  ) as HTMLInputElement,

  collectedCounter: document.getElementById(
    UI_SELECTORS.COLLECTED_COUNTER_ID,
  ) as HTMLSpanElement,

  openEditorLink: document.getElementById(
    UI_SELECTORS.OPEN_EDITOR_BTN_ID,
  ) as HTMLAnchorElement,

  preferenceInputs: document.getElementById(
    UI_SELECTORS.PREFERENCE_INPUTS_ID,
  ) as HTMLInputElement,

  preferencePassword: document.getElementById(
    UI_SELECTORS.PREFERENCE_PASSWORD_ID,
  ) as HTMLInputElement,

  preferenceTextareas: document.getElementById(
    UI_SELECTORS.PREFERENCE_TEXTAREAS_ID,
  ) as HTMLInputElement,

  preferenceContenteditable: document.getElementById(
    UI_SELECTORS.PREFERENCE_CONTENTEDITABLE_ID,
  ) as HTMLInputElement,
};

/**
 * Update the UI elements based on the provided settings.
 *
 * @param settings - Partial settings object to apply to the UI.
 */
export function renderUi(settings: Partial<Settings>): void {
  const {
    clipboard,
    copyOnSelect,
    floatingButton,
    collect2FileBtn,
    collectedCounter,
    preferenceInputs,
    preferencePassword,
    preferenceTextareas,
    preferenceContenteditable,
  } = ui;

  if (settings.mode != 'disabled') {
    if (settings.mode == 'onSelect') {
      copyOnSelect.checked = true;
      floatingButton.checked = false;
    } else if (settings.mode == 'floatingButton') {
      copyOnSelect.checked = false;
      floatingButton.checked = true;
    }

    if (clipboard.classList.contains(UI_SELECTORS.CLIPBOARD_DISABLED_CLASS)) {
      clipboard.classList.remove(UI_SELECTORS.CLIPBOARD_DISABLED_CLASS);
    }
  } else if (settings.mode == 'disabled') {
    copyOnSelect.checked = false;
    floatingButton.checked = false;
    clipboard.classList.add(UI_SELECTORS.CLIPBOARD_DISABLED_CLASS);
  }

  typeof settings.collectToFile === 'boolean' &&
    (collect2FileBtn.checked = settings.collectToFile);

  getSetting('collectedText').then(collected => {
    collectedCounter.textContent = collected.text.length.toString();
  });

  if (typeof settings.allowInInputs === 'boolean') {
    if (settings.allowInInputs) {
      preferenceInputs.checked = true;

      document
        .querySelector('html')
        ?.classList.add(UI_SELECTORS.EXPAND_SUB_PREFERENCE_CLASS);

      typeof settings.allowInPasswords === 'boolean' &&
        (preferencePassword.checked = settings.allowInPasswords);
    }
  }

  typeof settings.allowInTextareas === 'boolean' &&
    (preferenceTextareas.checked = settings.allowInTextareas);

  typeof settings.allowInContenteditable === 'boolean' &&
    (preferenceContenteditable.checked = settings.allowInContenteditable);
}
