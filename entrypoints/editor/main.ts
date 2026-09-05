import '@/sass/layout/_editor.sass';

import { browser } from 'wxt/browser';
import { EditorView, basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { UI_SELECTORS } from '@/utils/constants';
import { getSetting } from '@/lib/settings';
import { EditorController } from './EditorController';
import { onEditorUpdate, clearAll, appendFileContent, changeFileName } from './actions';

async function init() {
  const wrapper = document.querySelector(UI_SELECTORS.EDITOR_WRAPPER) as HTMLDivElement;

  const clearButton = wrapper.querySelector(
    UI_SELECTORS.EDITOR_CLEAR_BTN,
  ) as HTMLButtonElement;

  const laodButton = wrapper.querySelector(
    UI_SELECTORS.EDITOR_LOAD_FILE,
  ) as HTMLButtonElement;

  const saveButton = wrapper.querySelector(
    UI_SELECTORS.EDITOR_SAVE_FILE,
  ) as HTMLButtonElement;

  const fileName = wrapper.querySelector(
    UI_SELECTORS.EDITOR_FILE_NAME,
  ) as HTMLInputElement;

  const view = new EditorView({
    doc: (await getSetting('collectedText')).text.join('\n'),
    parent: wrapper.querySelector(UI_SELECTORS.EDITOR) as HTMLElement,
    extensions: [
      basicSetup,
      oneDark,
      EditorView.updateListener.of(onEditorUpdate),
      EditorView.theme({
        '&': {
          height: '100%',
          minHeight: '100%',
        },
      }),
    ],
  });

  const editor = new EditorController(view);

  clearButton.addEventListener('click', async () => await clearAll());
  laodButton.addEventListener('click', () => appendFileContent());
  saveButton.addEventListener('click', async () => await editor.export());
  fileName.addEventListener('input', e => changeFileName(e));

  fileName.placeholder = await getSetting('exportFileName');

  browser.storage.onChanged.addListener((changes, area) => {
    editor.syncStorageDiff(changes, area);
  });
}

init();
