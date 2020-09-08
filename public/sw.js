let cacheData = 'app1';

var urlsToCache = [
  '/',
  // 'localhost',
  '/static/js/1.chunk.js',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/0.bundle.js',
  '/static/js/main.b02fb03b4ece0ce87ea6.hot-update.js',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/images/icons/test-192x192.png',
];

this.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

this.addEventListener(
  'fetch',
  (event) => {
    // console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) {
          return result;
        }
      })
    );
  }
);
