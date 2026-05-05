import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  webExt: {
    firefoxProfile: 'default-esr',
    keepProfileChanges: true,
  },

  imports: false,

  vite: () => ({
    build: {
      sourcemap: true,
    },
  }),

  manifest: ({ browser }) => ({
    name: 'Omni Copy',
    version: '1.0.1',
    description:
      'The ultimate selection tool. Auto-copy on select or via a floating button, with full control over where — your clipboard, your rules',

    ...(browser === 'firefox' && {
      permissions: ['storage', 'clipboardWrite'],
      browser_specific_settings: {
        gecko: {
          id: 'omni-copy@local.dev',
          data_collection_permissions: {
            required: ['none'],
          },
        },
      },
    }),

    ...(browser === 'chrome' && {
      permissions: ['storage', 'clipboardWrite', 'offscreen'],
    }),

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
