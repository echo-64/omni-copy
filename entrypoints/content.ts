import { defineContentScript } from 'wxt/utils/define-content-script';
import { Settings } from '@/utils/defaults';
import { onSelect, onSelectEnd, clean } from '@/lib/selection';
import { getSettings } from '@/lib/settings';

export default defineContentScript({
  matches: ['*://*/*'],

  async main() {
    let settings: Settings = await getSettings();

    document.addEventListener('selectionchange', () => {
      if (settings.mode !== 'disabled') {
        onSelect();
      }
    });

    document.addEventListener('mouseup', async (ev: MouseEvent) => {
      if (settings.mode !== 'disabled') {
        await onSelectEnd(settings, ev);
      }
    });

    document.addEventListener('keydown', (ev: KeyboardEvent) => {
      if (settings.mode !== 'disabled') {
        const key: string = ev.key.toLowerCase();
        const isArrowKey: boolean =
          key == 'arrowup' ||
          key == 'arrowdown' ||
          key == 'arrowright' ||
          key == 'arrowleft';

        if (ev.shiftKey) {
          if (!isArrowKey && key != 'shift' && key != 'control') {
            clean();
          }
        } else if (key != 'control') {
          clean();
        }
      }
    });
  },
});
