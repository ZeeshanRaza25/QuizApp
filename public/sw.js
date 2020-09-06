console.log('registered');
let cacheData = 'appv1';

// var urlsToCache = [
//   '/',
//   '/styles/main.css',
//   '/script/main.js'
// ];

this.addEventListener('activate', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        // 'localhost',
        '/static/js/1.chunk.js',
        '/static/js/bundle.js',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/0.bundle.js',
        '/index.html',
        '/manifest.json',
        '/favicon.ico',
        '/images/icons/test-192x192.png',
        // '/main.52182c7192c981271d21.hot-update.js',
        // 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple',
        '/',
      ]);
    })
  );
});

this.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        console.log('result', result);
        if (result) {
          return result;
        }
      })
    );
  }
});
