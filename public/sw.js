let cacheData = "appv1";

// var urlsToCache = [
//   '/',
//   '/styles/main.css',
//   '/script/main.js'
// ];

this.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheData).then((data) => {
         data.addAll([
           "/static/js/bundle.js",
           "/static/js/main.chunk.js",
           "/static.js/0.chunk.js",
           "index.html",
         ]);
      })
  );
});