// self.addEventListener('install', function(e) {
//   console.log('[ServiceWorker] Installing service worker...');

//   e.waitUntil(
//     caches.open('pwa-cache-v1').then(function(cache) {
//       return cache.addAll([
//         '/belajar_pwa/manifest.json',
//         '/belajar_pwa/icon-192.png',
//         '/belajar_pwa/icon-512.png'
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });

const CACHE_NAME = 'agpaii-pwa-v1';
const FILES_TO_CACHE = [
  '/',
  '/belajar_pwa/manifest.json',
  '/belajar_pwa/icon-192.png',
  '/belajar_pwa/icon-512.png',
  // Tambahkan di sini jika kamu punya file gambar/logo lain
];

// Install service worker
self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // langsung aktif
});

// Activate service worker
self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // langsung kendalikan page
});

// Fetch handler
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
