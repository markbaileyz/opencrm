
/**
 * Mobile offline utilities
 * Provides functionality for handling offline capabilities on mobile devices
 */

import { useMediaQuery } from "@/hooks/use-media-query";
import { useOfflineState } from "@/hooks/use-offline-state";
import { useToast } from "@/hooks/use-toast";

/**
 * Determines if the device is mobile
 * @returns boolean indicating if current device is mobile
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Checks if the browser supports service workers
 * @returns boolean indicating if service workers are supported
 */
export const supportsServiceWorker = () => {
  return 'serviceWorker' in navigator;
};

/**
 * Checks if the browser supports IndexedDB for offline storage
 * @returns boolean indicating if IndexedDB is supported
 */
export const supportsIndexedDB = () => {
  return window.indexedDB !== undefined;
};

/**
 * Hook to handle mobile offline capabilities
 * @returns Object with mobile offline utilities
 */
export const useMobileOffline = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isOnline, pendingActions, isSyncing } = useOfflineState();
  const { toast } = useToast();

  /**
   * Enables offline mode for the application
   */
  const enableOfflineMode = async () => {
    if (!supportsServiceWorker() || !supportsIndexedDB()) {
      toast({
        title: "Offline Mode Not Supported",
        description: "Your browser doesn't support offline capabilities.",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Register service worker if not already registered
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        toast({
          title: "Offline Mode Enabled",
          description: "You can now use the app offline.",
        });
        return true;
      }
    } catch (error) {
      console.error("Service worker registration failed:", error);
      toast({
        title: "Offline Mode Setup Failed",
        description: "Unable to enable offline functionality.",
        variant: "destructive"
      });
      return false;
    }

    return false;
  };

  /**
   * Checks if offline mode is currently enabled
   */
  const isOfflineModeEnabled = async (): Promise<boolean> => {
    if (!supportsServiceWorker()) return false;
    
    const registrations = await navigator.serviceWorker.getRegistrations();
    return registrations.length > 0;
  };

  return {
    isMobile,
    isOnline,
    pendingActions,
    isSyncing,
    enableOfflineMode,
    isOfflineModeEnabled,
    supportsOfflineMode: supportsServiceWorker() && supportsIndexedDB(),
  };
};
