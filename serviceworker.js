//set up cache name and files to add to it
const CACHE_NAME = 'cade-website';
const CACHE_URLS = ['/',
    'index.html',
    'skills.html',
    'qualifications.html',
    'css1.html',
    'css2.html',
    'coffee.html',
    '404.html',
    'manifest.json',
    'scripts/coffee.js',
    'styles/main.css',
    'styles/design1.css',
    'styles/design2.css',
    'images/android-chrome-192x192.png',
    'images/android-chrome-512x512.png',
    'images/apple-touch-icon.png',
    'images/favicon.ico',
    'images/home.svg',
    'images/skills.svg',
    'images/qualifications.svg',
    'images/favicon-16x16.png',
    'images/favicon-32x32.png',
    'images/banner.png',
    'images/banner.webp',
    'images/cade_camera.png',
    'images/cade_camera.webp',
    'images/man_point.png',
    'images/man_point.webp',
    'images/gradcap.png',
    'images/gradcap.webp',
    'images/books.png',
    'images/books.webp',
    'images/lock.png',
    'images/lock.webp',
    'images/coffee.png',
    'images/coffee.webp',
    'images/octopus.png',
    'images/octopus.webp',
    'images/design1.png',
    'images/design1.webp',
    'images/design2.png',
    'images/design2.webp',
    'images/browserconfig.xml'];

// Wait until we have been notified that we are installed
self.addEventListener("install", function(event) {

    // Create a cache, and add the resources to the cache
    // Tell the "install" event to wait for the promises to resolve before it completes
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {

            // Now add all URLs to the cache
            return cache.addAll(CACHE_URLS);
        })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cacheName) {
            if (cacheName.endsWith('appshell') && CACHE_NAME !== cacheName) {
                return caches.delete(cacheName);
            }
        }));
    }));
});

//add all URLs to cache when installed
//...
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        //check whether asset is in cache
        if (response) {
            //asset in cache, so return it
            return response;
        }
        //asset not in cache so fetch asset from network
        return fetch(event.request);
    }));
});