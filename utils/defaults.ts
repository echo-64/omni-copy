export interface Settings {
  mode: "onSelect" | "floatingButton" | "disabled";
  allowInInputs: boolean;
  allowInPasswords: boolean;
  allowInTextareas: boolean;
  allowInContenteditable: boolean;
}

/**
 * Deafualt settings
 */
export const defaults: Settings = {
  mode: "onSelect",
  allowInInputs: false,
  allowInPasswords: false,
  allowInTextareas: false,
  allowInContenteditable: false,
};
