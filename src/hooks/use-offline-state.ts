
import { useState, useEffect } from 'react';

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
  }>>([]);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      processPendingActions();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
    setPendingActions(prev => [
      ...prev,
      { type, payload, timestamp: Date.now() }
    ]);
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
  const processPendingActions = () => {
    // This would normally call API endpoints or perform other online operations
    // For now, we just clear the pending actions
    console.log('Processing pending actions:', pendingActions);
    
    // After processing, clear the queue
    setPendingActions([]);
  };

  return {
    isOnline,
    queueAction,
    storeOfflineData,
    getOfflineData,
    pendingActions,
    processPendingActions
  };
}
