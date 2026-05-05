import '../../sass/popup.sass';

import { ui, renderUi } from '@/lib/render';
import { updateSettings } from '@/lib/settings';

const {
  copyOnSelect,
  floatingButton,
  prefrenceInputs,
  prefrencePassword,
  prefrenceTextareas,
  prefrenceContenteditable,
} = ui;

renderUi(await browser.storage.local.get());

copyOnSelect.addEventListener('change', async function () {
  if (!this.checked && !floatingButton.checked) {
    await updateSettings({ mode: 'disabled' });
  } else if (
    this.checked &&
    (!floatingButton.checked || floatingButton.checked)
  ) {
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

prefrenceInputs.addEventListener('change', async function () {
  if (this.checked) {
    document.querySelector('html')?.classList.add('expand-sub-prefrence');

    await updateSettings({
      allowInInputs: true,
      allowInPasswords: false,
    });
  } else {
    document.querySelector('html')?.classList.remove('expand-sub-prefrence');

    await updateSettings({
      allowInInputs: false,
      allowInPasswords: false,
    });
  }
});

prefrencePassword.addEventListener('change', async function () {
  await updateSettings({ allowInPasswords: this.checked });
});

prefrenceTextareas.addEventListener('change', async function () {
  await updateSettings({ allowInTextareas: this.checked });
});

prefrenceContenteditable.addEventListener('change', async function () {
  await updateSettings({ allowInContenteditable: this.checked });
});
