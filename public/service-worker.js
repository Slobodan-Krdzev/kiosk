// Name of the cache
// const CACHE_NAME = "vite-react-pwa-cache-v1";

// List of assets to cache (add your specific files here)
// const ASSETS_TO_CACHE = [
//   "/",
//   "/index.html",
//   "/manifest.json",
//   "/tabletmenukaart_logo.jpg", // Replace with actual asset paths
// ];

// Install event: cache the assets
self.addEventListener("install", () => {
  // event.waitUntil(
  //   caches
  //     .open(CACHE_NAME)
  //     .then((cache) => {
  //       console.log("Caching assets...");
  //       return cache.addAll(ASSETS_TO_CACHE);
  //     })
  //     .then(() => self.skipWaiting()) // Activate immediately
  // );
  self.skipWaiting(); 
});

// Activate event: clean up old caches
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             console.log("Deleting old cache:", cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       )
//     ).then(() => self.clients.claim()) e
//   );
// });

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName)) // Delete all caches
      );
    })
  );
});

// Fetch event: respond with cache or network fallback
self.addEventListener("fetch", (event) => {
  // event.respondWith(
  //   caches.match(event.request).then((cachedResponse) => {
  //     if (cachedResponse) {
  //       return cachedResponse;
  //     }
  //     return fetch(event.request).catch(() =>
  //       caches.match("/offline.html") // Optional fallback for offline
  //     );
  //   })
  // );

  event.respondWith(
    fetch(event.request) 
      .then((response) => response) 
      .catch(() => caches.match(event.request)) 
  );
});