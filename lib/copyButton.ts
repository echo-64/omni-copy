import { getSelected, clean } from './selection';
import { type Response } from '../entrypoints/background';
import { BACKGROUND } from '@/utils/constants';

const body: HTMLBodyElement | null = document.querySelector('body');
const log: (...data: any[]) => void = console.log.bind(console);

const onEvent: 'mousedown' = 'mousedown';
export const hostId: string = 'omni-copy-button-host';

/**
 * Render the floating copy button at the mouse event position.
 *
 * @param ev - Mouse event used to position the button.
 */
export function renderButton(ev: MouseEvent): void {
  if (body instanceof HTMLBodyElement) {
    const host = document.createElement('div');
    const style = document.createElement('style');

    host.id = hostId;
    host.style.cssText = `z-index:1000000;position:absolute;top:${ev.pageY + 11}px;left:${ev.pageX}px;width:fit-content;height:fit-content;`;
    style.textContent = `.omni-btn{display: flex;align-items: center;justify-content: center;gap: 3px;padding: 3px 4px;background: #1a3a5f;color: #f0f8ff;border: 1px solid #69b7bb;outline: none;border-radius: 4px;font-size: 12px;font-weight: 500;font-family: system-ui, sans-serif;text-transform: capitalize;letter-spacing: 0.01em;cursor: pointer;user-select: none;transition: background 0.15s ease, border-color 0.15s ease}.omni-btn svg rect{stroke: #69b7bb}.omni-btn:not(.omni-btn--copied):not(.omni-btn--error):hover{background: #25507a;border-color: #8ed0d4}.omni-btn--copied{background: #0f6e56;color: #e1f5ee;border-color: #5dcaa5}.omni-btn--copied svg polyline{stroke: #5dcaa5}.omni-btn--error{background: #A32D2D;color: #FCEBEB;border-color:#F09595}.omni-btn--error svg line{stroke: #F09595}`;

    const shadow = host.attachShadow({ mode: 'closed' });

    shadow.appendChild(style);
    shadow.appendChild(createButton('copy'));
    document.body.appendChild(host);

    document.body.addEventListener(
      onEvent,
      async ev => {
        await onClick(ev, shadow);
      },
      { once: true },
    );
  }
}

/**
 * Create a button element for the given copy status.
 *
 * @param state - Visual state used to determine label and styling.
 */
function createButton(state: 'copy' | 'copied' | 'error'): HTMLButtonElement {
  const button = document.createElement('button');

  button.classList.add('omni-btn');

  if (state === 'copy') {
    button.title = 'copy selected';
    button.innerHTML = `<svg width=13 height=13 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><rect x=5 y=1 width=9 height=11 rx=1.5 stroke=#8ed0d4 stroke-width=1.5 /><rect x=2 y=4 width=9 height=11 rx=1.5 fill=#25507a stroke=#8ed0d4 stroke-width=1.5 /></svg>copy`;
  } else if (state === 'copied') {
    button.classList.add('omni-btn--copied');
    button.innerHTML = `<svg width=13 height=13 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><polyline points="2,8 6,12 14,4"stroke=#5dcaa5 stroke-width=2 stroke-linecap=round stroke-linejoin=round /></svg>copied`;
  } else if (state === 'error') {
    button.classList.add('omni-btn--error');
    button.innerHTML =
      '<svg width=13 height=13 viewBox="0 0 16 16"fill=none><line x1=3 y1=3 x2=13 y2=13 stroke=#F09595 stroke-width=2 stroke-linecap=round /><line x1=13 y1=3 x2=3 y2=13 stroke=#F09595 stroke-width=2 stroke-linecap=round /></svg>error';
  }

  return button;
}

/**
 * Handle clicks on the floating copy button and update its state.
 *
 * @param ev - Mouse event from the body listener.
 * @param shadow - Shadow root containing the button UI.
 */
async function onClick(ev: MouseEvent, shadow: ShadowRoot) {
  if (ev.target === document.getElementById(hostId)) {
    const response: Response = await browser.runtime.sendMessage({
      type: BACKGROUND.MSG_TYPE,
      text: getSelected(),
    });

    if (response.result === 'copied') {
      onSuccess();
    } else if (response.result === 'error') {
      log('omni-copy:', response.message);
      onFail();
    }

    setTimeout(clean, 600);
  } else {
    clean();
  }

  function onSuccess() {
    shadow.replaceChild(
      createButton('copied'),
      shadow.querySelector('button')!,
    );
  }

  function onFail() {
    shadow.replaceChild(createButton('error'), shadow.querySelector('button')!);
  }
}

/**
 * Remove the button host element from the document body if it exists.
 */
export function removeButtonHost() {
  const host: HTMLElement | null = document.getElementById(hostId);
  host && document.body.removeChild(host);
}
