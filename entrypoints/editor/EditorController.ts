import { EditorView } from '@codemirror/view';
import { Transaction } from '@codemirror/state';
import { getSetting } from '@/lib/settings';

/**
 * Wraps a CodeMirror EditorView to handle the editor-specific logic.
 * Keeps the view reference handy so we don't have to pass it everywhere.
 */
export class EditorController {
  /** The underlying CodeMirror view — the actual editor guts. */
  readonly view: EditorView;

  /**
   * Creates a new controller bound to the given view.
   * @param view — The CodeMirror view instance to control.
   */
  constructor(view: EditorView) {
    this.view = view;
  }

  /** Nukes the entire document content. Remote annotation so it doesn't trigger sync loops. */
  clear(): void {
    this.view.dispatch({
      annotations: Transaction.remote.of(true),
      changes: { from: 0, to: this.view.state.doc.length, insert: '' },
    });
  }

  /**
   * Appends new lines to the end of the document.
   * Adds a leading newline if the doc isn't empty, otherwise starts clean.
   * @param content — Array of strings to append as new lines.
   */
  append(content: string[]): void {
    if (content.length === 0) return;

    this.view.dispatch({
      annotations: Transaction.remote.of(true),
      changes: {
        from: this.view.state.doc.length,
        insert: (this.view.state.doc.length ? '\n' : '') + content.join('\n'),
      },
    });
  }

  /** Exports the current document as a downloadable file. Uses the user's configured filename. */
  async export(): Promise<void> {
    const blob: Blob = new Blob([this.view.state.doc.toString()], {
      type: 'text/plain',
    });

    const url = URL.createObjectURL(blob);

    browser.downloads
      .download({
        url,
        saveAs: true,
        filename: await getSetting('exportFileName'),
      })
      .catch(err => alert(err))
      .finally(() => {
        console.log('revoking url');
        URL.revokeObjectURL(url);
      });
  }

  /**
   * Handles storage change events from the background script.
   * Only reacts to 'local' storage changes on the 'collectedText' key.
   * Expects the new value to have a `source` of 'storage' and a `tag` of 'copy', 'load', or 'clear'.
   * @param changes — The storage change dictionary from the browser API.
   * @param area — Which storage area changed.
   */
  syncStorageDiff(
    changes: { [key: string]: globalThis.Browser.storage.StorageChange },
    area: globalThis.Browser.storage.AreaName,
  ): void {
    if (area !== 'local' || !changes.collectedText) return;

    const { source, tag } = changes.collectedText.newValue as CollectedText;

    if (source !== 'storage') return;

    const oldValue = (changes.collectedText.oldValue as CollectedText).text ?? [];
    const newValue = (changes.collectedText.newValue as CollectedText).text ?? [];

    if (typeof tag === 'string') {
      if (tag == 'copy' || tag == 'load-file') {
        this.append(newValue.slice(oldValue.length));
      } else if (tag == 'clear') {
        this.clear();
      }
    }
  }
}
