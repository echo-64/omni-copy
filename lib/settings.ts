import { browser } from 'wxt/browser';
import { defaults, type Settings } from '@/utils/defaults';
import { patchSettings } from '@/utils/patchSettings';

/**
 * Updates the user settings by merging changes and saving to storage, then re-renders the UI.
 * @param {Partial<Settings>} changes - The partial settings object with changes to apply.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export async function updateSettings(changes: Partial<Settings>): Promise<Settings> {
  const saved: Settings = await browser.storage.local.get();
  const update: Settings = patchSettings(saved, changes);
  await browser.storage.local.set(update);
  return update;
}

/** Fetches all settings from storage (falls back to defaults if empty). */
export async function getSettings(): Promise<Settings> {
  return await browser.storage.local.get(defaults);
}

/** Grabs a single setting by key — handy when you don't need the whole object. */
export async function getSetting<K extends keyof Settings>(key: K): Promise<Settings[K]> {
  return (await getSettings())[key];
}
