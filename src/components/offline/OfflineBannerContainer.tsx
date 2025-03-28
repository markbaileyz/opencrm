
import React from "react";
import { useOfflineState } from "@/hooks/use-offline-state";
import OfflineBanner from "@/components/ui/offline-banner";

const OfflineBannerContainer: React.FC = () => {
  const { 
    isOnline, 
    pendingActions, 
    isSyncing, 
    forceSyncAttempt,
    lastSyncTimestamp
  } = useOfflineState();

  return (
    <div className="sticky top-0 z-50">
      <OfflineBanner 
        isOnline={isOnline} 
        pendingActions={pendingActions}
        isSyncing={isSyncing}
        onTryReconnect={forceSyncAttempt}
        lastSyncTimestamp={lastSyncTimestamp}
        className="rounded-none border-x-0 border-t-0"
      />
    </div>
  );
};

export default OfflineBannerContainer;
