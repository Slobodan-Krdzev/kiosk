import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const hash = Math.floor(Math.random() * 90000) + 10000;

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(new Date().getTime())
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff,woff2}"],
        cleanupOutdatedCaches: true,
        skipWaiting: true, 
        clientsClaim: true,
      },
      selfDestroying: true,
      manifest: {
        short_name: "KIOSK",
        name: "KIOSK",
        description: "A Kiosk Food Menu Cart Application",
        scope: '/',
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        start_url: "/",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "fullscreen",
        orientation: 'portrait'
      },
    }),
  ],
      
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + hash + `.js`,
        chunkFileNames: `[name]` + hash + `.js`,
        assetFileNames: `[name]` + hash + `.[ext]`
      }
    }
  }
});

