
import React, { useState } from "react";
import SettingsCard from "../SettingsCard";
import { WifiOff, Database, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOfflineState } from "@/hooks/use-offline-state";
import { formatDistanceToNow, format } from "date-fns";
import OfflineStatusIndicator from "@/components/offline/OfflineStatusIndicator";
import { useToast } from "@/hooks/use-toast";

const OfflineSettings = () => {
  const { 
    isOnline, 
    pendingActions, 
    isSyncing, 
    processPendingActions,
    clearOfflineData,
    forceSyncAttempt,
    lastSyncTimestamp
  } = useOfflineState();
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const handleClearData = () => {
    setIsClearing(true);
    
    // Add a small delay to simulate processing
    setTimeout(() => {
      clearOfflineData();
      setIsClearing(false);
      toast({
        title: "Offline data cleared",
        description: "All cached data and pending actions have been removed.",
      });
    }, 500);
  };

  // Format the last sync time for display
  const lastSyncTime = lastSyncTimestamp 
    ? {
        relative: formatDistanceToNow(new Date(lastSyncTimestamp), { addSuffix: true }),
        absolute: format(new Date(lastSyncTimestamp), 'PPpp')
      }
    : null;

  return (
    <SettingsCard
      title="Offline Mode"
      description="Manage your offline data and synchronization settings"
      icon={<WifiOff className="h-5 w-5" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <OfflineStatusIndicator showDetails className="flex-1" />
          
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-sm font-medium">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={forceSyncAttempt}
                disabled={isSyncing || (!isOnline && pendingActions === 0)}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="justify-start text-destructive hover:text-destructive"
                onClick={handleClearData}
                disabled={isClearing}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isClearing ? 'Clearing...' : 'Clear Offline Data'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Offline Status Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted/30 rounded-md border">
              <h4 className="text-xs font-medium mb-2">Connection Status</h4>
              <p className="text-sm flex items-center gap-2">
                {isOnline ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Connected to network
                  </>
                ) : (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Disconnected
                  </>
                )}
              </p>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-md border">
              <h4 className="text-xs font-medium mb-2">Sync Status</h4>
              <p className="text-sm flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  <Database className="h-3 w-3" />
                  {pendingActions} pending {pendingActions === 1 ? 'action' : 'actions'}
                </span>
                <span className="text-xs text-muted-foreground">
                  Last synced: {lastSyncTime ? (
                    <span title={lastSyncTime.absolute}>{lastSyncTime.relative}</span>
                  ) : (
                    "Never"
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Offline Mode Information</h3>
          <div className="text-sm space-y-2 text-muted-foreground">
            <p>
              Offline mode allows you to continue working even when you don't have an internet connection. 
              Your changes will be saved locally and synchronized with the server when you're back online.
            </p>
            <p>
              The application automatically detects your connection status and switches between online and offline modes.
              You can also manually trigger synchronization using the "Sync Now" button.
            </p>
            <p>
              If you're experiencing issues with offline mode, you can try clearing the offline data using the 
              "Clear Offline Data" button. This will remove all cached data and pending actions.
            </p>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

export default OfflineSettings;
