export enum OFFSCREEN {
  DOC_PATH = '/offscreen.html',
  MSG_TYPE = 'OFFSCRENN_CLIPBOARD_WRITE',
  JUSTIFICATION = 'MV3 Omni-Copy needs a DOM to write to the clipboard',
}

export enum BACKGROUND {
  MSG_TYPE = 'CLIPBOARD_WRITE',
}

export enum UI_SELECTORS {
  CLIPBOARD = 'div.clipboard',
  CLIPBOARD_DISABLED_CLASS = 'disabled',
  COPY_ON_SELECT_ID = 'copyOnSelect',
  FLOATING_BTN_ID = 'copyButton',
  COLLECT_TO_FILE_ID = 'collect-to-file',
  COLLECTED_COUNTER_ID = 'collected-counter',
  OPEN_EDITOR_BTN_ID = 'open-editor',
  EDITOR_WRAPPER = 'div.omni-copy-collected-text',
  EDITOR = 'section.text-editor',
  EDITOR_LOAD_FILE = 'button#load-file',
  EDITOR_SAVE_FILE = 'button#save-file',
  EDITOR_CLEAR_BTN = 'button#clear-editor',
  EDITOR_FILE_NAME = 'input#file-name',
  PREFERENCE_INPUTS_ID = 'preference-inputs',
  PREFERENCE_PASSWORD_ID = 'preference-password',
  PREFERENCE_TEXTAREAS_ID = 'preference-textareas',
  PREFERENCE_CONTENTEDITABLE_ID = 'preference-contenteditable',
  EXPAND_SUB_PREFERENCE_CLASS = 'expand-sub-preference',
}
