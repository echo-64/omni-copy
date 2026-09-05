export interface Settings {
  mode: 'onSelect' | 'floatingButton' | 'disabled';
  collectToFile: boolean;
  collectedText: CollectedText;
  exportFileName: string;
  allowInInputs: boolean;
  allowInPasswords: boolean;
  allowInTextareas: boolean;
  allowInContenteditable: boolean;
}

export interface CollectedText {
  source: 'editor' | 'storage';
  text: string[];
  tag?: string;
}

/**
 * Deafualt settings
 */
export const defaults: Settings = {
  mode: 'onSelect',
  collectToFile: false,
  collectedText: { source: 'storage', text: [] },
  exportFileName: 'collected-text.txt',
  allowInInputs: false,
  allowInPasswords: false,
  allowInTextareas: false,
  allowInContenteditable: false,
};
