import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'KIOSK',
        short_name: 'Kiosk',
        description: 'A Progressive Web App built for KIOSK',
        orientation: 'portrait',
        display: 'fullscreen',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-192x192.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://cms.dev.revelapps.com", 
        changeOrigin: true, 
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' from the request URL
      },
      "/availabilityAPI": {
        target: "http://pos.dev.revelapps.com", 
        changeOrigin: true, 
        secure: false,
        rewrite: (path) => path.replace(/^\/availabilityAPI/, ""),
      },
    },
  },
});

// cms.dev.revelapps.com
// http://cms.dev.revelapps.com/service/getresources?deviceid=2&menuid=0011002408

