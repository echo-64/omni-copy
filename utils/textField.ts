/**
 * Checks if the given element is a text field (input or textarea).
 * @param element - The element to check.
 * @returns True if the element is a text field, false otherwise.
 */
export function isTextField(element: Element | null): boolean {
  if (element instanceof Element) {
    const tag: string = element.tagName.toLowerCase();

    const isInput: boolean =
      tag === 'input' &&
      // * They are the only types that support text selection properties | DOMException
      /^(text|email|password|search|tel|url)$/i.test(
        (element as HTMLInputElement).type,
      );

    return isInput || tag === 'textarea';
  }

  return false;
}

/**
 * Type guard to check if the given element is an HTMLInputElement.
 * @param element - The element to check.
 * @returns True if the element is an HTMLInputElement, false otherwise.
 */
export function isInputElement(
  element: Element | any,
): element is HTMLInputElement {
  if (!element) {
    return false;
  }

  return element.tagName === 'INPUT';
}

/**
 * Checks if the input element has the specified type.
 * @param input - The HTMLInputElement to check.
 * @param type - The type to compare against.
 * @returns True if the input's type matches the given type, false otherwise.
 * @throws Error if the given element is not an input element.
 */
export function isOfType(input: HTMLInputElement, type: string): boolean {
  if (!(input instanceof HTMLInputElement)) {
    throw new Error('The given element is not an input element');
  }

  return input.type === type;
}