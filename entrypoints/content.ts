import { defineContentScript } from 'wxt/utils/define-content-script';
import { Settings } from '@/utils/defaults';
import { onSelect, onSelectEnd } from '@/lib/selection';
import { getSettings } from '@/lib/settings';
import { browser } from 'wxt/browser';
import { removeButtonHost } from '@/lib/copyButton';

export default defineContentScript({
  matches: ['*://*/*'],

  async main() {
    let settings: Settings = await getSettings();

    browser.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local') return;

      for (const key in changes) {
        if (key === 'collectedText') continue;

        if (changes[key].newValue !== changes[key].oldValue) {
          settings = { ...settings, [key]: changes[key].newValue };
        }
      }
    });

    document.addEventListener('selectionchange', () => {
      if (settings.mode === 'disabled') return;
      onSelect();
    });

    document.addEventListener('mouseup', async (ev: MouseEvent) => {
      if (settings.mode === 'disabled') return;
      await onSelectEnd(settings, ev);
    });

    document.addEventListener('keydown', (ev: KeyboardEvent) => {
      if (settings.mode !== 'floatingButton') return;

      const isArrowKey: boolean =
        ev.key == 'ArrowUp' ||
        ev.key == 'ArrowDown' ||
        ev.key == 'ArrowRight' ||
        ev.key == 'ArrowLeft';

      if (!ev.shiftKey || (!isArrowKey && ev.key !== 'Shift' && ev.key !== 'Control')) {
        if (ev.key !== 'Control') removeButtonHost();
      }
    });
  },
});
