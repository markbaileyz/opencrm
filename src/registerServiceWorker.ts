
import { VERSION } from "./version";

type UpdateCallback = () => void;

let updateCallback: UpdateCallback | null = null;

/**
 * Register the service worker for the application
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Register the service worker
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      
      console.log(`Service Worker registered with scope: ${registration.scope}`);
      console.log(`App version: ${VERSION.toString()}`);
      
      // Check if it's a new version 
      if (registration.active) {
        checkVersion(registration);
      }
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (updateCallback) {
                updateCallback();
              }
            }
          });
        }
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.log('Service Worker not supported in this browser');
  }
};

/**
 * Check service worker for updates
 */
export const checkForServiceWorkerUpdate = (callback: UpdateCallback) => {
  updateCallback = callback;
  
  // Check for updates periodically
  setInterval(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.update().catch(err => {
            console.error('Error updating service worker:', err);
          });
        }
      });
    }
  }, 60 * 60 * 1000); // Check every hour
};

/**
 * Update the service worker
 */
export const updateServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }
};

/**
 * Check service worker version
 */
const checkVersion = (registration: ServiceWorkerRegistration) => {
  // Check if the active service worker has a different version
  // This would create a MessageChannel to communicate with the service worker
  const messageChannel = new MessageChannel();
  
  messageChannel.port1.onmessage = (event) => {
    if (event.data && event.data.version) {
      // Service worker version
      const swVersion = event.data.version;
      // Current app version
      const appVersion = VERSION.toString();
      
      console.log(`App version: ${appVersion}, Service Worker version: ${swVersion}`);
      
      if (swVersion !== appVersion && updateCallback) {
        updateCallback();
      }
    }
  };
  
  if (registration.active) {
    registration.active.postMessage(
      { type: 'GET_VERSION' },
      [messageChannel.port2]
    );
  }
};
