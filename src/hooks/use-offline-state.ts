
import { useState, useCallback } from "react";

interface UseOfflineStateReturn {
  isOnline: boolean;
  pendingActions: number;
  isSyncing: boolean;
  processPendingActions: () => Promise<void>;
}

export const useOfflineState = (): UseOfflineStateReturn => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // Process pending actions when back online
  const processPendingActions = useCallback(async () => {
    if (!isOnline || pendingActions === 0) return;
    
    setIsSyncing(true);
    
    try {
      // Mock sync delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPendingActions(0);
    } catch (error) {
      console.error("Error syncing data:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, pendingActions]);

  return {
    isOnline,
    pendingActions,
    isSyncing,
    processPendingActions
  };
};
