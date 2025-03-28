
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

/**
 * Register for background sync if available
 * @returns {Promise<boolean>} Whether registration was successful
 */
export const registerBackgroundSync = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-offline-data');
      console.log('Background sync registered');
      return true;
    } catch (error) {
      console.error('Background sync registration failed:', error);
      return false;
    }
  }
  console.log('Background sync not supported');
  return false;
};

/**
 * Add event listeners for online/offline events
 * @param onlineCallback Function to call when online status changes to online
 * @param offlineCallback Function to call when online status changes to offline
 * @returns Cleanup function to remove event listeners
 */
export const addNetworkStatusListeners = (
  onlineCallback: () => void,
  offlineCallback: () => void
): () => void => {
  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);
  
  // Return a cleanup function
  return () => {
    window.removeEventListener('online', onlineCallback);
    window.removeEventListener('offline', offlineCallback);
  };
};
