const CACHE_NAME = 'baby-sleep-v8';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icon-192.png',
        './icon-512.png',
        'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js?v=20250810-1',
        'https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3.0.0/dist/chartjs-adapter-date-fns.umd.min.js?v=20250810-1'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
  