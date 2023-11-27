// Define the version and cache name for the application
const VERSION = 'v1';
const CACHE_NAME = `period-tracker-${VERSION}`;

// List of static resources to be cached
const APP_STATIC_RESOURCES = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/wheel.svg',
]

// Event listener for the 'install' event - caching static resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            // Open the cache and add static resources to it during installation
            const cache = await caches.open(CACHE_NAME);
            cache.addAll(APP_STATIC_RESOURCES);
        })()
    );
});

// Event listener for the 'activate' event - managing cache versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Retrieve all existing cache names
            const names = await caches.keys();
            await Promise.all(
                names.map((name) => {
                    // Delete any cache that is not the current CACHE_NAME
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
            // Take control of clients immediately after activation
            await clients.claim();
        })()
    );
});

// Event listener for the 'fetch' event - serving cached resources
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        // For navigation requests, respond with cached '/' route
        event.respondWith(caches.match('/'));
        return;
    }
    event.respondWith(
        (async () => {
            // Open the cache and check if the requested resource is cached
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request.url);
            if (cachedResponse) {
                // If the resource is cached, return it
                return cachedResponse;
            }
            // If resource is not found in cache, respond with a 404 status
            return new Response('Not found', { status: 404 });
        })()
    )
});
