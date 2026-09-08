import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: false,

  vite: () => ({
    build: {
      sourcemap: true,
    },
  }),

  manifest: ({ browser }) => ({
    name: 'Omni Copy',
    version: '1.1.3',
    description:
      'Copy on select or via a button. Collect to an editable file. Control where it works — your clipboard, your rules.',

    ...(browser === 'firefox' && {
      browser_specific_settings: {
        gecko: {
          id: 'omni-copy@local.dev',
          data_collection_permissions: {
            required: ['none'],
          },
        },
      },
    }),

    permissions: [
      'storage',
      'clipboardWrite',
      ...(browser === 'chrome' ? ['offscreen'] : []),
      'downloads',
    ],

    host_permissions: ['*://*/*'],

    icons: {
      '16': 'icon-16.png',
      '48': 'icon-48.png',
      '128': 'icon-128.png',
    },
    action: {
      default_icon: {
        '19': 'icon-19.png',
        '38': 'icon-38.png',
      },
    },
  }),
});
