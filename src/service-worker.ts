
/// <reference lib="webworker" />

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add your own!

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'opencrm-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard',
  '/contacts',
  '/deals',
  // Add more static assets here
  '/static/css/',
  '/static/js/',
  '/static/media/'
];

// Static assets that should be cached
const STATIC_ASSETS = [
  '/static/css/',
  '/static/js/',
  '/static/media/',
  '/favicon.ico',
  '/robots.txt'
];

// API routes that should be cached with network-first strategy
const API_ROUTES = [
  '/api/contacts',
  '/api/organizations',
  '/api/deals'
];

// Install event - cache initial resources
self.addEventListener('install', (event: ExtendableEvent) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service worker installed, cache opened');
        return cache.addAll(urlsToCache);
      })
  );
  
  // Force this service worker to activate immediately
  self.skipWaiting();
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event: FetchEvent) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Don't cache cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // For API requests, try network first, then fall back to cache
  if (API_ROUTES.some(route => url.pathname.includes(route))) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // For page navigations or static assets, use cache first, network as fallback
  if (request.mode === 'navigate' || STATIC_ASSETS.some(asset => url.pathname.includes(asset))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Default strategy: stale while revalidate
  event.respondWith(staleWhileRevalidateStrategy(request));
});

// Cache-first strategy: Try cache first, fallback to network
async function cacheFirstStrategy(request: Request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // If both cache and network fail, return a custom offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/');
    }
    
    // For other requests, return a simple error response
    return new Response('Network error occurred', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network-first strategy: Try network first, fallback to cache
async function networkFirstStrategy(request: Request) {
  try {
    const networkResponse = await fetch(request);
    
    // If the network request is successful, cache the response
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If both network and cache fail, return a simple error response
    return new Response(JSON.stringify({ error: 'Network error, no cached data available' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Stale-while-revalidate strategy: Return cached version immediately, then update cache
async function staleWhileRevalidateStrategy(request: Request) {
  const cache = await caches.open(CACHE_NAME);
  
  // First, try to get the resource from the cache
  const cachedResponse = await cache.match(request);
  
  // Get an updated version from the network in the background
  const networkResponsePromise = fetch(request).then(response => {
    // Update the cache with the new version
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {
    // Do nothing on network failure - we already have the cached version or will handle the failure below
  });
  
  // Return the cached response immediately, or wait for the network response if there's no cached version
  return cachedResponse || networkResponsePromise || new Response('Network error and no cache available', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Message handling for communication with the main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline data
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'sync-pending-actions') {
    event.waitUntil(syncPendingActions());
  }
});

// Function to sync pending actions when back online
async function syncPendingActions() {
  try {
    // This would normally get the pending actions from IndexedDB
    // For now we'll just log that sync is happening
    console.log('Syncing pending actions after coming back online');
    
    // In a real implementation, this would:
    // 1. Get all pending actions from IndexedDB
    // 2. Send them to the server one by one
    // 3. Delete them from IndexedDB once confirmed by the server
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error syncing pending actions:', error);
    return Promise.reject(error);
  }
}

// Need to export something for TypeScript
export {};
