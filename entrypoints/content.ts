import { Settings } from '@/utils/defaults';
import { patchSettings } from '@/utils/patchSettings';
import { onSelect, onSelectEnd, clean } from '@/lib/selection';

export default defineContentScript({
  matches: ['*://*/*'],

  async main() {
    let settings: Settings = await browser.storage.local.get();

    browser.storage.local.onChanged.addListener(async (changes: any) => {
      for (const option in changes) {
        const { newValue, oldValue } = changes[option];

        if (newValue !== oldValue) {
          settings = patchSettings(settings, { [option]: newValue });
          await browser.storage.local.set({ [option]: newValue });
        }
      }
    });

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
