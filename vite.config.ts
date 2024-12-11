import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff,woff2}"],
      },
      manifest: {
        short_name: "KIOSK",
        name: "KIOSK",
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

