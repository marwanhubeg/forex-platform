// Service Worker للنسخة الاحترافية
const CACHE_NAME = 'forex-platform-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/lessons.html',
  '/analysis.html',
  '/payment.html',
  '/css/style.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/app.js',
  '/js/config.js'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// استرجاع من الكاش
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// تحديث الكاش
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
