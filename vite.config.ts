import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src/service-worker',
    filename: 'sw.ts',
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: '<nostr-site-name>',
      short_name: '<nostr-site-short-name>',
      description: '<nostr-site-description>',
      theme_color: '#ffffff',
      icons: [
        {
          src: '<nostr-site-icon-192>',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '<nostr-site-icon-512>',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
  },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})