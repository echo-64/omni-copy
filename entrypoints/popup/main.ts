import '../../sass/popup.sass';

import { ui, renderUi } from '@/lib/render';
import { getSettings, updateSettings } from '@/lib/settings';
import { UI_SELECTORS } from '@/utils/constants';

const {
  copyOnSelect,
  floatingButton,
  collect2FileBtn,
  openEditorLink,
  preferenceInputs,
  preferencePassword,
  preferenceTextareas,
  preferenceContenteditable,
} = ui;

await renderUi(await getSettings());

copyOnSelect.addEventListener('change', async function () {
  if (!this.checked && !floatingButton.checked) {
    await updateSettings({ mode: 'disabled', collectToFile: false });
  } else if (this.checked && (!floatingButton.checked || floatingButton.checked)) {
    await updateSettings({ mode: 'onSelect' });
  }
});

floatingButton.addEventListener('change', async function () {
  if (!this.checked && !copyOnSelect.checked) {
    await updateSettings({ mode: 'disabled', collectToFile: false });
  } else if (this.checked && (!copyOnSelect.checked || copyOnSelect.checked)) {
    await updateSettings({ mode: 'floatingButton' });
  }
});

collect2FileBtn.addEventListener('change', async function () {
  await updateSettings({ collectToFile: this.checked });
});

openEditorLink.addEventListener('click', async function () {
  await browser.tabs.create({
    url: browser.runtime.getURL('/editor.html'),
  });
});

preferenceInputs.addEventListener('change', async function () {
  if (this.checked) {
    document
      .querySelector('html')
      ?.classList.add(UI_SELECTORS.EXPAND_SUB_PREFERENCE_CLASS);

    await updateSettings({
      allowInInputs: true,
      allowInPasswords: false,
    });
  } else {
    document
      .querySelector('html')
      ?.classList.remove(UI_SELECTORS.EXPAND_SUB_PREFERENCE_CLASS);

    await updateSettings({
      allowInInputs: false,
      allowInPasswords: false,
    });
  }
});

preferencePassword.addEventListener('change', async function () {
  await updateSettings({ allowInPasswords: this.checked });
});

preferenceTextareas.addEventListener('change', async function () {
  await updateSettings({ allowInTextareas: this.checked });
});

preferenceContenteditable.addEventListener('change', async function () {
  await updateSettings({ allowInContenteditable: this.checked });
});
