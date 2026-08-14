import '../../sass/popup.sass';

import { ui, renderUi } from '@/lib/render';
import { updateSettings } from '@/lib/settings';
import { UI_SELECTORS } from '@/utils/constants';

const {
  copyOnSelect,
  floatingButton,
  preferenceInputs,
  preferencePassword,
  preferenceTextareas,
  preferenceContenteditable,
} = ui;

renderUi(await browser.storage.local.get());

copyOnSelect.addEventListener('change', async function () {
  if (!this.checked && !floatingButton.checked) {
    await updateSettings({ mode: 'disabled' });
  } else if (this.checked && (!floatingButton.checked || floatingButton.checked)) {
    await updateSettings({ mode: 'onSelect' });
  }
});

floatingButton.addEventListener('change', async function () {
  if (!this.checked && !copyOnSelect.checked) {
    await updateSettings({ mode: 'disabled' });
  } else if (this.checked && (!copyOnSelect.checked || copyOnSelect.checked)) {
    await updateSettings({ mode: 'floatingButton' });
  }
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
