import { type CollectedText } from '@/utils/defaults';
import { getSetting } from './settings';

/**
 * Saves a new piece of text to the user's collected items (read-modify-write).
 */
export async function collectText(text: string): Promise<void> {
  await pushCollectedText({ tag: 'copy', source: 'storage', text: [text] });
}

/**
 * Appends new collected text to existing storage (read-modify-write).
 * Use collectText() for simple cases; this is the lower-level API.
 */
export async function pushCollectedText(collected: CollectedText): Promise<void> {
  await setCollectedText({
    ...collected,
    text: [...(await getCollectedText()), ...collected.text],
  });
}

/**
 * Overwrites the entire collected text array in storage.
 * Caller is responsible for merging if needed — see pushCollectedText().
 */
export async function setCollectedText(collected: CollectedText): Promise<void> {
  await browser.storage.local.set({ collectedText: collected });
}

/**
 * Gets the current collected text array from storage.
 * Returns empty array if nothing saved yet.
 */
export async function getCollectedText(): Promise<string[]> {
  return (await getSetting('collectedText')).text;
}

/**
 * Wipes all collected text. Nuclear option.
 */
export async function clearCollectedText(): Promise<void> {
  await setCollectedText({ tag: 'clear', source: 'storage', text: [] });
}
