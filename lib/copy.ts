/**
 * Writes text to the clipboard using the modern Clipboard API.
 *
 * This function attempts to use `navigator.clipboard.writeText()` first. If
 * that call fails (for example because permission was denied or the API is not
 * available), it falls back to the legacy DOM copy implementation.
 *
 * @param text - The string value to copy into the user's clipboard.
 * @returns A promise that resolves with `'copied'` when clipboard writing succeeds.
 * @throws When both modern and legacy copy strategies fail, the promise is
 * rejected with an object containing combined error messages.
 */
export async function preformCopy(text: string): Promise<'copied'> {
  try {
    window.focus();
    await navigator.clipboard.writeText(text);
  } catch (modernCopyError: any) {
    try {
      await preformLegacyCopy(text);
    } catch (legacyCopyError: any) {
      throw new Error(`${modernCopyError.message}\n${legacyCopyError.message}`);
    }
  }


  return 'copied';
}

/**
 * Writes text to the clipboard using a legacy DOM copy fallback.
 *
 * This function creates a hidden textarea, selects its contents, and executes
 * the deprecated `document.execCommand('copy')` command. It is intended as a
 * fallback for browsers or environments where the modern Clipboard API is not
 * available or fails.
 *
 * @param text - The string value to copy into the user's clipboard.
 * @returns A promise that resolves with `'copied'` when the fallback copy succeeds.
 * @throws When the legacy copy approach fails, the promise is rejected with the thrown error.
 */
export async function preformLegacyCopy(text: string): Promise<'copied'> {
  try {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  } catch (err) {
    throw err;
  }

  return 'copied';
}
