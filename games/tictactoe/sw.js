var cacheName = 'ttt-offline-pwa';
var filesToCache = [
    '/games/tictactoe/index.html',
    '/games/tictactoe/css/style.css',
    '/games/tictactoe/js/main.js',
    '/games/tictactoe/js/game.js',
    '/games/tictactoe/res/x.svg'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});