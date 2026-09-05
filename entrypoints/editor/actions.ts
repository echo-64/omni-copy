import { ViewUpdate } from '@codemirror/view';
import { Transaction } from '@codemirror/state';
import { debounce } from '@/utils/debounce';
import { clearCollectedText, pushCollectedText, setCollectedText } from '@/lib/editor';

const debounceStorageWrite = debounce(async (update: ViewUpdate) => {
  await setCollectedText({
    source: 'editor',
    text: update.state.doc.toJSON() as string[],
  });
}, 1000);

/**
 * Handles editor updates, persisting local changes to storage.
 * Ignores remote changes and no-op updates to avoid feedback loops.
 */
export function onEditorUpdate(update: ViewUpdate): void {
  const isRemoteChange: boolean = update.transactions.some(
    t => t.annotation(Transaction.remote) === true,
  );

  if (isRemoteChange) return;
  if (!update.docChanged) return;

  debounceStorageWrite(update);
}

/**
 * Opens file picker to load content from a local file into the editor.
 * Splits file text by newlines and pushes to storage with 'load-file' tag.
 */
export function appendFileContent(): void {
  const input = document.getElementById('file-loader') as HTMLInputElement;

  input.click();

  input.addEventListener(
    'change',
    async function (this: HTMLInputElement) {
      const file = this.files?.item(0);

      if (!file) {
        alert('Error: Cannot reading file');
        return;
      }

      await pushCollectedText({
        text: (await file.text()).split(/[\n\r]+/),
        source: 'storage',
        tag: 'load-file',
      });
    },
    { once: true },
  );
}

/**
 * Clears all collected text after user confirmation.
 * Returns early if user cancels the confirmation dialog.
 */
export async function clearAll(): Promise<void> {
  if (!confirm('Clear all collected text?')) return;
  await clearCollectedText();
}

/**
 * Debounced handler for filename input changes.
 * Persists the filename to storage, defaulting to 'collected-text.txt' if empty.
 */
export const changeFileName = debounce(async (e: InputEvent) => {
  const input = e.target as HTMLInputElement;
  const value: string = input.value;
  const name: string = value || 'collected-text.txt';

  input.placeholder = name;

  await browser.storage.local.set({ exportFileName: name });
}, 1000);
