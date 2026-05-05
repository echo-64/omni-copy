import { browser } from 'wxt/browser';
import { OFFSCREEN } from '@/utils/constants';

/**
 * Close the offscreen document if it exists.
 */
export async function closeOffscreen(): Promise<void> {
  if (!(await browser.offscreen.hasDocument())) {
    return;
  }

  await browser.offscreen.closeDocument();
}

/**
 * Create an offscreen document for clipboard operations.
 */
export async function createOffscreen(): Promise<void> {
  await browser.offscreen.createDocument({
    url: browser.runtime.getURL(OFFSCREEN.DOC_PATH),
    justification: OFFSCREEN.JUSTIFICATION,
    reasons: ['CLIPBOARD'],
  });
}
