
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useOfflineState } from "@/hooks/use-offline-state";
import OfflineBanner from "@/components/ui/offline-banner";

const OfflineBannerContainer: React.FC = () => {
  const { toast } = useToast();
  const { 
    isOnline, 
    pendingActions, 
    isSyncing, 
    processPendingActions 
  } = useOfflineState();

  const handleTryReconnect = () => {
    if (navigator.onLine) {
      processPendingActions();
      toast({
        title: "Reconnected",
        description: "You are now online. Syncing your changes...",
      });
    } else {
      toast({
        title: "Still offline",
        description: "You are still offline. Please check your internet connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="sticky top-0 z-50">
      <OfflineBanner 
        isOnline={isOnline} 
        pendingActions={pendingActions}
        isSyncing={isSyncing}
        onTryReconnect={handleTryReconnect}
        className="rounded-none border-x-0 border-t-0"
      />
    </div>
  );
};

export default OfflineBannerContainer;
