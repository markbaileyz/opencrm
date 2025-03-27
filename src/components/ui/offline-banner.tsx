
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WifiOff, Wifi, AlertCircle } from "lucide-react";

interface OfflineBannerProps {
  isOnline: boolean;
  pendingActions?: number;
  className?: string;
}

/**
 * Banner that displays when the user is offline
 * and shows pending actions that will sync when back online
 */
const OfflineBanner = ({
  isOnline,
  pendingActions = 0,
  className,
}: OfflineBannerProps) => {
  if (isOnline && pendingActions === 0) {
    return null;
  }

  if (!isOnline) {
    return (
      <Alert variant="destructive" className={className}>
        <WifiOff className="h-4 w-4" />
        <AlertTitle>You are offline</AlertTitle>
        <AlertDescription>
          Some features may be limited. Changes will be saved and synchronized when you're back online.
          {pendingActions > 0 && (
            <div className="mt-2 text-sm">
              {pendingActions} {pendingActions === 1 ? 'action' : 'actions'} pending synchronization
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (pendingActions > 0) {
    return (
      <Alert className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Synchronizing</AlertTitle>
        <AlertDescription>
          {pendingActions} {pendingActions === 1 ? 'change' : 'changes'} being synchronized...
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default OfflineBanner;
