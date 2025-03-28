import { useState, useEffect } from 'react';
import { registerBackgroundSync, addNetworkStatusListeners } from '../registerServiceWorker';
import { useToast } from './use-toast';

/**
 * Hook for tracking online/offline status and providing offline capabilities
 */
export function useOfflineState() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<Record<string, any>>({});
  const [pendingActions, setPendingActions] = useState<Array<{
    type: string;
    payload: any;
    timestamp: number;
    id: string;
    retryCount: number;
  }>>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<number | null>(null);
  const { toast } = useToast();

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "You're back online",
        description: pendingActions.length > 0 
          ? `Syncing ${pendingActions.length} pending ${pendingActions.length === 1 ? 'action' : 'actions'}...` 
          : "All data is up to date",
      });
      processPendingActions();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Don't worry, your changes will be saved and synced when you're back online.",
        variant: "destructive",
      });
    };

    // Add listeners for online/offline events
    const cleanup = addNetworkStatusListeners(handleOnline, handleOffline);
    
    // Try to register for background sync if available
    if (isOnline && pendingActions.length > 0) {
      registerBackgroundSync();
    }

    return cleanup;
  }, [pendingActions.length, isOnline, toast]);

  // Load offline data from localStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('offlineData');
      if (storedData) {
        setOfflineData(JSON.parse(storedData));
      }
      
      const storedActions = localStorage.getItem('pendingActions');
      if (storedActions) {
        setPendingActions(JSON.parse(storedActions));
      }
      
      const storedLastSync = localStorage.getItem('lastSyncTimestamp');
      if (storedLastSync) {
        setLastSyncTimestamp(JSON.parse(storedLastSync));
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('offlineData', JSON.stringify(offlineData));
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  }, [offlineData]);

  // Save pending actions to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('pendingActions', JSON.stringify(pendingActions));
    } catch (error) {
      console.error('Error saving pending actions:', error);
    }
  }, [pendingActions]);

  // Save last sync timestamp to localStorage when it changes
  useEffect(() => {
    if (lastSyncTimestamp) {
      try {
        localStorage.setItem('lastSyncTimestamp', JSON.stringify(lastSyncTimestamp));
      } catch (error) {
        console.error('Error saving last sync timestamp:', error);
      }
    }
  }, [lastSyncTimestamp]);

  /**
   * Queue an action to be processed when online
   */
  const queueAction = (type: string, payload: any) => {
    const newAction = { 
      type, 
      payload, 
      timestamp: Date.now(),
      id: Math.random().toString(36).substring(2, 15),
      retryCount: 0
    };
    
    setPendingActions(prev => [...prev, newAction]);
    
    // If we're online, try to process immediately
    if (isOnline) {
      processPendingActions();
    } else {
      toast({
        title: "Action queued",
        description: "Your action will be processed when you're back online.",
      });
    }
    
    return true;
  };

  /**
   * Store data for offline access
   */
  const storeOfflineData = (key: string, data: any) => {
    setOfflineData(prev => ({
      ...prev,
      [key]: data
    }));
    
    // If it's a critical data update, notify the user
    if (key.includes('critical')) {
      toast({
        title: "Critical data saved",
        description: "This data will be available offline.",
      });
    }
  };

  /**
   * Get data stored for offline access
   */
  const getOfflineData = (key: string) => {
    return offlineData[key];
  };

  /**
   * Process pending actions when coming back online
   */
  const processPendingActions = async () => {
    if (!isOnline || pendingActions.length === 0 || isSyncing) {
      return;
    }
    
    setIsSyncing(true);
    
    // Process actions in order
    const actionsToProcess = [...pendingActions];
    const completedActionIds: string[] = [];
    const failedActions: typeof pendingActions = [];
    
    for (const action of actionsToProcess) {
      try {
        // This would normally call API endpoints
        console.log('Processing action:', action);
        
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Simulate occasional failure for demonstration
        if (Math.random() > 0.9 && action.retryCount < 3) {
          throw new Error('Simulated network error');
        }
        
        // Mark this action as completed
        completedActionIds.push(action.id);
        
        // Log success
        console.log(`Action ${action.type} processed successfully`);
      } catch (error) {
        console.error('Error processing action:', action, error);
        
        // Add to failed actions with increased retry count
        failedActions.push({
          ...action,
          retryCount: action.retryCount + 1
        });
        
        // If we've already retried 3 times, notify the user
        if (action.retryCount >= 2) {
          toast({
            title: "Sync error",
            description: `Failed to sync action after multiple attempts. Please try again later.`,
            variant: "destructive",
          });
        }
      }
    }
    
    // Remove completed actions from the queue and keep failed ones
    setPendingActions(prev => [
      ...prev.filter(action => !actionsToProcess.some(a => a.id === action.id)),
      ...failedActions
    ]);
    
    // Update last sync timestamp
    setLastSyncTimestamp(Date.now());
    
    setIsSyncing(false);
    
    // If everything was processed successfully, notify the user
    if (completedActionIds.length === actionsToProcess.length) {
      toast({
        title: "Sync complete",
        description: `Successfully synchronized ${completedActionIds.length} ${completedActionIds.length === 1 ? 'action' : 'actions'}.`,
        variant: "success",
      });
    } else if (completedActionIds.length > 0) {
      toast({
        title: "Partial sync",
        description: `Synchronized ${completedActionIds.length} of ${actionsToProcess.length} actions. Retrying failed actions...`,
        variant: "warning",
      });
    }
  };

  /**
   * Clear all stored offline data and pending actions
   */
  const clearOfflineData = () => {
    setOfflineData({});
    setPendingActions([]);
    setLastSyncTimestamp(null);
    localStorage.removeItem('offlineData');
    localStorage.removeItem('pendingActions');
    localStorage.removeItem('lastSyncTimestamp');
    
    toast({
      title: "Offline data cleared",
      description: "All cached data and pending actions have been cleared.",
    });
  };

  /**
   * Force a sync attempt even if offline by checking network status again
   */
  const forceSyncAttempt = () => {
    // Check if we're actually online despite what the state says
    if (navigator.onLine && !isOnline) {
      setIsOnline(true);
    }
    
    if (navigator.onLine) {
      processPendingActions();
      return true;
    } else {
      toast({
        title: "Still offline",
        description: "Cannot sync while offline. Please check your connection.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    isOnline,
    isSyncing,
    queueAction,
    storeOfflineData,
    getOfflineData,
    pendingActions: pendingActions.length,
    processPendingActions,
    clearOfflineData,
    forceSyncAttempt,
    lastSyncTimestamp
  };
}
