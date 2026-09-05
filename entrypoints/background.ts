import { createOffscreen } from '@/lib/offscreen';
import { preformCopy } from '@/lib/copy';
import { BACKGROUND, OFFSCREEN } from '@/utils/constants';
import { getSettings } from '@/lib/settings';

export type Response = { result: 'copied' } | { result: 'error'; message: string };

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(
    (message, _, sendResponse: (response: Response) => void) => {
      (async () => {
        if (message.type === BACKGROUND.MSG_TYPE) {
          if (browser.offscreen) {
            // * (Chrome/MV3)
            if (!(await browser.offscreen.hasDocument())) {
              await createOffscreen();
            }

            const response: Response = await browser.runtime.sendMessage({
              type: OFFSCREEN.MSG_TYPE,
              data: message.text,
            });

            sendResponse(response);
          } else {
            // * (Firefox/MV2)
            await preformCopy(message.text)
              .then(result => sendResponse({ result }))
              .catch(reason => {
                sendResponse({
                  result: 'error',
                  message: reason.message || 'Unknown Error!',
                });
              });
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
