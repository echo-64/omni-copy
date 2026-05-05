import { Settings } from './defaults';

/**
 * Merges a partial settings object into the current settings.
 * @param {Settings} current - The current settings object.
 * @param {Partial<Settings>} patch - The partial settings to merge.
 * @returns {Settings} The updated settings object.
 */
export function patchSettings(
  current: Settings,
  patch: Partial<Settings>,
): Settings {
  return { ...current, ...patch };
}
