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
        target: "http://dev.revelapps.com:9091", // Target your backend
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' from the request URL
      },
    },
  },
});
