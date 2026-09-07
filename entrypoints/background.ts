import { defineBackground } from 'wxt/utils/define-background';
import { browser } from 'wxt/browser';
import { createOffscreen } from '@/lib/offscreen';
import { preformCopy } from '@/lib/copy';
import { BACKGROUND, OFFSCREEN } from '@/utils/constants';
import { getSetting, getSettings } from '@/lib/settings';
import { collectText } from '@/lib/editor';

export type Response = { result: 'copied' } | { result: 'error'; message: string };

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(
    (message, _, sendResponse: (response: Response) => void) => {
      (async () => {
        if (message.type === BACKGROUND.MSG_TYPE) {
          if (browser.offscreen) {
            if (!(await browser.offscreen.hasDocument())) {
              await createOffscreen();
            }

            const response: Response = await browser.runtime.sendMessage({
              type: OFFSCREEN.MSG_TYPE,
              data: message.text,
            });

            sendResponse(response);
          } else {
            await preformCopy(message.text)
              .then(result => sendResponse({ result }))
              .catch(reason => {
                sendResponse({
                  result: 'error',
                  message: reason.message || 'Unknown Error!',
                });
              });
          }

          if ((await getSetting('collectToFile')) === true) {
            await collectText(message.text);
          }
        }
      })();

      return true;
    },
  );

  browser.runtime.onInstalled.addListener(async () => {
    await browser.storage.local.set(await getSettings());
  });
});
