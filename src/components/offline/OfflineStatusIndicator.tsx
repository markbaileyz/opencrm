
import React from "react";
import { useOfflineState } from "@/hooks/use-offline-state";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { WifiOff, Wifi, RefreshCw, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface OfflineStatusIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  className = "",
  showDetails = false
}) => {
  const {
    isOnline,
    isSyncing,
    pendingActions,
    processPendingActions,
    forceSyncAttempt,
    lastSyncTimestamp
  } = useOfflineState();

  // Format the last sync time as "X minutes/hours ago"
  const lastSyncText = lastSyncTimestamp 
    ? formatDistanceToNow(new Date(lastSyncTimestamp), { addSuffix: true })
    : "Never";

  if (showDetails) {
    return (
      <div className={`flex flex-col gap-2 p-3 rounded-md ${className} ${isOnline ? 'bg-green-50' : 'bg-amber-50'}`}>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-600" />
          ) : (
            <WifiOff className="h-4 w-4 text-amber-600" />
          )}
          <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-amber-600'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        
        {(pendingActions > 0 || isSyncing) && (
          <div className="text-xs flex items-center gap-1 text-slate-600">
            {isSyncing ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Syncing {pendingActions} {pendingActions === 1 ? 'action' : 'actions'}...</span>
              </>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                <span>{pendingActions} pending {pendingActions === 1 ? 'action' : 'actions'}</span>
              </>
            )}
          </div>
        )}
        
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Last sync: {lastSyncText}</span>
        </div>
        
        {!isSyncing && pendingActions > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            className="mt-1 text-xs h-7"
            onClick={forceSyncAttempt}
            disabled={!isOnline || isSyncing}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Sync now
          </Button>
        )}
      </div>
    );
  }

  // Tooltip content
  const tooltipContent = (
    <div className="text-xs">
      <p>{isOnline ? 'Online' : 'Offline'}</p>
      {pendingActions > 0 && (
        <p>{pendingActions} pending {pendingActions === 1 ? 'action' : 'actions'}</p>
      )}
      {isSyncing && <p>Syncing...</p>}
      <p className="text-muted-foreground">Last sync: {lastSyncText}</p>
    </div>
  );

  // Simple indicator for navbar/status bar
  return (
    <Tooltip 
      content={tooltipContent}
      position="bottom"
    >
      <Button
        variant="ghost"
        size="icon"
        className={`relative ${className}`}
        onClick={isOnline ? processPendingActions : forceSyncAttempt}
        disabled={isSyncing}
      >
        {isOnline ? (
          <Wifi className={`h-4 w-4 ${isSyncing ? 'text-amber-500' : 'text-green-500'}`} />
        ) : (
          <WifiOff className="h-4 w-4 text-amber-500" />
        )}
        
        {pendingActions > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {pendingActions > 9 ? '9+' : pendingActions}
          </span>
        )}
        
        {isSyncing && (
          <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-2 h-2"></span>
        )}
      </Button>
    </Tooltip>
  );
};

export default OfflineStatusIndicator;
