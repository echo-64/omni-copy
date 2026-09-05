/**
 * Delays calling `fn` until `delay` ms have passed since the last call.
 * Useful for taming rapid-fire events like resize, scroll, or keystrokes.
 */
export function debounce(
  fn: Function,
  delay: number,
): (this: any, ...args: any[]) => void {
  let timer: undefined | number | any;

  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = undefined;
      fn.call(this, ...args);
    }, delay);
  };
}
