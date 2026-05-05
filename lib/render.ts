interface Ui {
  copyOnSelect: HTMLInputElement;
  floatingButton: HTMLInputElement;
  prefrencesDiv: HTMLDivElement;
  prefrenceInputs: HTMLInputElement;
  prefrencePassword: HTMLInputElement;
  prefrenceTextareas: HTMLInputElement;
  prefrenceContenteditable: HTMLInputElement;
}

/**
 * Object containing references to key UI elements for settings management.
 */
export const ui: Ui = {
  copyOnSelect: document.getElementById('copyOnSelect') as HTMLInputElement,

  floatingButton: document.getElementById('copyButton') as HTMLInputElement,

  prefrencesDiv: document.querySelector('div.prefrences') as HTMLDivElement,

  prefrenceInputs: document.getElementById(
    'prefrence-inputs',
  ) as HTMLInputElement,

  prefrencePassword: document.getElementById(
    'prefrence-password',
  ) as HTMLInputElement,

  prefrenceTextareas: document.getElementById(
    'prefrence-textareas',
  ) as HTMLInputElement,

  prefrenceContenteditable: document.getElementById(
    'prefrence-contenteditable',
  ) as HTMLInputElement,
};

/**
 * Update the UI elements based on the provided settings.
 *
 * @param settings - Partial settings object to apply to the UI.
 */
export function renderUi(settings: Partial<Settings>): void {
  const {
    copyOnSelect,
    floatingButton,
    prefrencesDiv,
    prefrenceInputs,
    prefrencePassword,
    prefrenceTextareas,
    prefrenceContenteditable,
  } = ui;

  switch (settings.mode) {
    case 'onSelect':
      copyOnSelect.checked = true;
      floatingButton.checked = false;

      if (prefrencesDiv.classList.contains('disabled')) {
        prefrencesDiv.classList.remove('disabled');
      }
      break;
    case 'floatingButton':
      copyOnSelect.checked = false;
      floatingButton.checked = true;

      if (prefrencesDiv.classList.contains('disabled')) {
        prefrencesDiv.classList.remove('disabled');
      }
      break;
    case 'disabled':
      copyOnSelect.checked = false;
      floatingButton.checked = false;
      prefrencesDiv.classList.add('disabled');
      break;
    default:
      break;
  }

  if (typeof settings.allowInInputs === 'boolean') {
    if (settings.allowInInputs) {
      prefrenceInputs.checked = true;

      document.querySelector('html')?.classList.add('expand-sub-prefrence');

      typeof settings.allowInPasswords === 'boolean' &&
        (prefrencePassword.checked = settings.allowInPasswords);
    }
  }

  typeof settings.allowInTextareas === 'boolean' &&
    (prefrenceTextareas.checked = settings.allowInTextareas);

  typeof settings.allowInContenteditable === 'boolean' &&
    (prefrenceContenteditable.checked = settings.allowInContenteditable);
}
