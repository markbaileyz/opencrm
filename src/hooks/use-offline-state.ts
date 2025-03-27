
import { useState, useEffect } from 'react';
import { registerBackgroundSync, addNetworkStatusListeners } from '../registerServiceWorker';

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
  }>>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      processPendingActions();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    // Add listeners for online/offline events
    const cleanup = addNetworkStatusListeners(handleOnline, handleOffline);
    
    // Try to register for background sync if available
    if (isOnline && pendingActions.length > 0) {
      registerBackgroundSync();
    }

    return cleanup;
  }, [pendingActions.length]);

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

  /**
   * Queue an action to be processed when online
   */
  const queueAction = (type: string, payload: any) => {
    const newAction = { 
      type, 
      payload, 
      timestamp: Date.now(),
      id: Math.random().toString(36).substring(2, 15) 
    };
    
    setPendingActions(prev => [...prev, newAction]);
    
    // If we're online, try to process immediately
    if (isOnline) {
      processPendingActions();
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
    
    for (const action of actionsToProcess) {
      try {
        // This would normally call API endpoints
        console.log('Processing action:', action);
        
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mark this action as completed
        completedActionIds.push(action.id);
      } catch (error) {
        console.error('Error processing action:', action, error);
        // We'll leave this action in the queue to retry later
        break;
      }
    }
    
    // Remove completed actions from the queue
    if (completedActionIds.length > 0) {
      setPendingActions(prev => 
        prev.filter(action => !completedActionIds.includes(action.id))
      );
    }
    
    setIsSyncing(false);
  };

  /**
   * Clear all stored offline data and pending actions
   */
  const clearOfflineData = () => {
    setOfflineData({});
    setPendingActions([]);
    localStorage.removeItem('offlineData');
    localStorage.removeItem('pendingActions');
  };

  return {
    isOnline,
    isSyncing,
    queueAction,
    storeOfflineData,
    getOfflineData,
    pendingActions: pendingActions.length,
    processPendingActions,
    clearOfflineData
  };
}
