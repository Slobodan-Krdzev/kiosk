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
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        short_name: "KIOSK",
        name: "KIOSK",
        icons: [
          {
            src: "/tabletmenukaart_logo.jpg",
            sizes: "103x101",
            type: "image/jpg",
          },
        ],
        start_url: "/",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "fullscreen",
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

