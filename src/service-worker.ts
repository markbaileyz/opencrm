/// <reference lib="webworker" />
import { VERSION } from './version';

// This is a placeholder for the service worker implementation.
// Actual service worker code would be more complex and include caching strategies, etc.

const sw = self as unknown as ServiceWorkerGlobalScope;

const APP_VERSION = VERSION.toString();
const CACHE_NAME = `app-cache-v${APP_VERSION}`;

// Install event - cache resources
sw.addEventListener('install', (event) => {
  console.log(`[Service Worker] Installing version ${APP_VERSION}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache essential files
      return cache.addAll([
        '/',
        '/index.html',
      ]);
    })
  );
});

// Activate event - clean up old caches
sw.addEventListener('activate', (event) => {
  console.log(`[Service Worker] Activating version ${APP_VERSION}`);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );
});

// Fetch event - serve from cache first, then network
sw.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response from cache
      if (response) {
        return response;
      }
      
      // Clone the request because it's a one-time use stream
      const fetchRequest = event.request.clone();
      
      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clone the response because it's a one-time use stream
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      });
    })
  );
});

// Message event - handle messages from the main thread
sw.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    // Send back the version info to the main thread
    event.ports[0].postMessage({
      version: APP_VERSION
    });
  }
});

export {};
