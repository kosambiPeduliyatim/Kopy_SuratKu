/* KOPY SuratKu Service Worker v1.0.0 */
const CACHE_NAME = 'kopy-suratku-cache-v1.0.0';
const APP_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/logo.svg',
  './css/style.css',
  './css/responsive.css',
  './css/print.css',
  './js/storage.js',
  './js/numbering.js',
  './js/organization.js',
  './js/letterhead.js',
  './js/signatory.js',
  './js/templates.js',
  './js/form-generator.js',
  './js/document-editor.js',
  './js/archive.js',
  './js/printing.js',
  './js/export-import.js',
  './js/search.js',
  './js/settings.js',
  './js/navigation.js',
  './js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Offline: Aset tidak tersedia dalam cache.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        });
    })
  );
});
