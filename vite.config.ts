import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import analyze from "rollup-plugin-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src/service-worker",
      filename: "sw.ts",
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "<nostr-site-name>",
        short_name: "<nostr-site-short-name>",
        description: "<nostr-site-description>",
        theme_color: "<nostr-site-accent-color>",
        icons: [
          {
            src: "<nostr-site-icon-192>",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "<nostr-site-icon-512>",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        injectionPoint: undefined,
        // required so that index.js wouldn't have variable declarations
        // colliding with the sw.js, ugly hack, figure out the fix later
        minify: false
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [analyze()],
      output: {
        // needed to allow importScripts on the index.js from sw,
        // also inlines the workbox-window.js which is great
        format: 'iife',
        dir: "dist",
        entryFileNames: "index.js",
      },
      external: []
    },
  },
});
