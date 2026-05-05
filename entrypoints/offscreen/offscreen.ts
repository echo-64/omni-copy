import { preformModernCopy } from '@/lib/copy';
import { OFFSCREEN } from '@/utils/constants';
import { type Response } from '../background';

browser.runtime.onMessage.addListener(
  (message, _, sendResponse: (response: Response) => void) => {
    (async () => {
      if (message.type === OFFSCREEN.MSG_TYPE) {
        await preformModernCopy(message.data)
          .then(result => sendResponse({ result }))
          .catch(reason => {
            sendResponse({
              result: 'error',
              message: reason.message || "Can't preform copy, Unknown Error",
            });
          });
      }
    })();

    return true;
  },
);
