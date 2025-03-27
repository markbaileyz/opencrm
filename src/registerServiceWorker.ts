
// Register service worker for offline support
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
};

// Check for newer service worker version and offer update
export const checkForServiceWorkerUpdate = (callback: () => void) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              callback();
            }
          });
        }
      });
    });
  }
};

// Update service worker
export const updateServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.update();
    });
  }
};

// Register for background sync
export const registerBackgroundSync = (syncTag: string = 'sync-pending-actions') => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      // @ts-ignore: SyncManager is not yet in TypeScript types
      return registration.sync.register(syncTag);
    }).catch(err => {
      console.log('Background sync registration failed:', err);
    });
  }
};

// Check if the app is online or offline
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Add listeners for online/offline events
export const addNetworkStatusListeners = (
  onlineCallback: () => void,
  offlineCallback: () => void
) => {
  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);
  
  return () => {
    window.removeEventListener('online', onlineCallback);
    window.removeEventListener('offline', offlineCallback);
  };
};
