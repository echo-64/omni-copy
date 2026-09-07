import '../../sass/popup.sass';

import { browser } from 'wxt/browser';
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

renderUi(await getSettings());

copyOnSelect.addEventListener('change', function () {
  if (!this.checked && !floatingButton.checked) {
    updateSettings({ mode: 'disabled', collectToFile: false }).then(renderUi);
  } else if (this.checked && (!floatingButton.checked || floatingButton.checked)) {
    updateSettings({ mode: 'onSelect' }).then(renderUi);
  }
});

floatingButton.addEventListener('change', function () {
  if (!this.checked && !copyOnSelect.checked) {
    updateSettings({ mode: 'disabled', collectToFile: false }).then(renderUi);
  } else if (this.checked && (!copyOnSelect.checked || copyOnSelect.checked)) {
    updateSettings({ mode: 'floatingButton' }).then(renderUi);
  }
});

collect2FileBtn.addEventListener('change', function () {
  updateSettings({ collectToFile: this.checked }).then(renderUi);
});

openEditorLink.addEventListener('click', async function () {
  await browser.tabs.create({
    url: browser.runtime.getURL('/editor.html'),
  });
});

preferenceInputs.addEventListener('change', function () {
  if (this.checked) {
    document
      .querySelector('html')
      ?.classList.add(UI_SELECTORS.EXPAND_SUB_PREFERENCE_CLASS);

    updateSettings({ allowInInputs: true, allowInPasswords: false }).then(renderUi);
  } else {
    document
      .querySelector('html')
      ?.classList.remove(UI_SELECTORS.EXPAND_SUB_PREFERENCE_CLASS);

    updateSettings({ allowInInputs: false, allowInPasswords: false }).then(renderUi);
  }
});

preferencePassword.addEventListener('change', function () {
  updateSettings({ allowInPasswords: this.checked }).then(renderUi);
});

preferenceTextareas.addEventListener('change', function () {
  updateSettings({ allowInTextareas: this.checked }).then(renderUi);
});

preferenceContenteditable.addEventListener('change', function () {
  updateSettings({ allowInContenteditable: this.checked }).then(renderUi);
});
