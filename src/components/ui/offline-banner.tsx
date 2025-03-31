
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface OfflineBannerProps {
  isOnline: boolean;
  pendingActions: number;
  isSyncing?: boolean;
  onTryReconnect?: () => void;
  className?: string;
}

const OfflineBanner = ({
  isOnline,
  pendingActions,
  isSyncing = false,
  onTryReconnect,
  className,
}: OfflineBannerProps) => {
  if (isOnline && pendingActions === 0) return null;

  const isOffline = !isOnline;
  const hasPendingActions = pendingActions > 0;

  return (
    <Alert
      variant={isOffline ? "destructive" : "default"}
      className={cn(className)}
    >
      <AlertCircle className="h-4 w-4" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <AlertTitle>
            {isOffline
              ? "You are offline"
              : hasPendingActions
              ? `${pendingActions} pending ${pendingActions === 1 ? "change" : "changes"}`
              : ""}
          </AlertTitle>
          {isOnline && hasPendingActions && (
            <Button
              variant="outline"
              size="sm"
              onClick={onTryReconnect}
              disabled={isSyncing}
              className="h-8"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                "Sync now"
              )}
            </Button>
          )}
        </div>
        <AlertDescription>
          {isOffline
            ? "Changes will be saved locally and synced when you're back online."
            : hasPendingActions
            ? "Changes made while offline will be synchronized."
            : ""}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default OfflineBanner;
