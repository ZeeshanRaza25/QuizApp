/* eslint-disable */

// console.log('registered');
let cacheData = 'app1';

var urlsToCache = [
  '/',
  'localhost',
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
];
  
//   window.addEventListener('install', function (e) {

//   e.userChoice.then(function (choiceResult) {
//     console.log(choiceResult.outcome);
//     if (choiceResult.outcome === 'dismissed') {
//       console.log('User cancelled home screen install');
//     } else {
//       console.log('User added to home screen');
//     }
//   });
// });

self.addEventListener('activate', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener(
  'fetch',
  (event) => {
    console.log(event.request.url);
    // if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        console.log('result', result);
        if (result) {
          return result || fetch(event.request);
        }
      })
    );
  }
  // }
);

// self.addEventListener('fetch', function(event) {
//   console.log(event.request.url);
//   event.respondWith(
//       caches.match(event.request).then(function(response) {
//           return response || fetch(event.request);
//       })
//   );
// });
