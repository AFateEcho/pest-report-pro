const CACHE_NAME = 'pest-report-pro-v2';
const urlsToCache = [
  './',
  './index.html',
  './css/app.css',
  './css/font-awesome.min.css',
  './js/app.js',
  './js/pdf-generator.js',
  './js/storage.js',
  './js/i18n.js',
  './js/html2canvas.min.js',
  './js/tailwindcss.min.js',
  './js/jspdf.umd.min.js',
  './js/jspdf.plugin.autotable.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).catch(() => {
        // Offline fallback
      });
    })
  );
});
