self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Installing service worker...');

  e.waitUntil(
    caches.open('pwa-cache-v1').then(function(cache) {
      return cache.addAll([
  '/belajar_pwa/manifest.json',
  '/belajar_pwa/HD.png'
]);

    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
