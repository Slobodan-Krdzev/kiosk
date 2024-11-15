import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My PWA App",
        short_name: "PWA App",
        description: "A full-screen PWA React app",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icons/hamburger.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/hamburger.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
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
