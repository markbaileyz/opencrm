
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WifiOff, Wifi, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfflineBannerProps {
  isOnline: boolean;
  pendingActions?: number;
  isSyncing?: boolean; 
  onTryReconnect?: () => void;
  className?: string;
}

/**
 * Banner that displays when the user is offline
 * and shows pending actions that will sync when back online
 */
const OfflineBanner = ({
  isOnline,
  pendingActions = 0,
  isSyncing = false,
  onTryReconnect,
  className,
}: OfflineBannerProps) => {
  if (isOnline && pendingActions === 0 && !isSyncing) {
    return null;
  }

  if (!isOnline) {
    return (
      <Alert variant="destructive" className={className}>
        <WifiOff className="h-4 w-4" />
        <AlertTitle>You are offline</AlertTitle>
        <AlertDescription>
          <div className="space-y-2">
            <p>
              Some features may be limited. Changes will be saved and synchronized when you're back online.
            </p>
            {pendingActions > 0 && (
              <div className="text-sm font-medium">
                {pendingActions} {pendingActions === 1 ? 'action' : 'actions'} pending synchronization
              </div>
            )}
            {onTryReconnect && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 bg-destructive/10 hover:bg-destructive/20 text-destructive"
                onClick={onTryReconnect}
              >
                <RefreshCw className="h-4 w-4 mr-2" /> Try to reconnect
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (isSyncing || pendingActions > 0) {
    return (
      <Alert className={className}>
        {isSyncing ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        <AlertTitle>{isSyncing ? "Synchronizing" : "Pending changes"}</AlertTitle>
        <AlertDescription>
          {pendingActions} {pendingActions === 1 ? 'change' : 'changes'} {isSyncing ? 'being synchronized...' : 'waiting to be synchronized'}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default OfflineBanner;
