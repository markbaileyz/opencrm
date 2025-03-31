
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Wifi, WifiOff, Download, Upload } from "lucide-react";
import { useMobileOffline } from "@/utils/mobile-offline-utils";
import { Badge } from "@/components/ui/badge";

interface MobileOfflineToggleProps {
  className?: string;
}

const MobileOfflineToggle: React.FC<MobileOfflineToggleProps> = ({ className = "" }) => {
  const { 
    isOnline, 
    pendingActions, 
    isSyncing, 
    enableOfflineMode,
    isOfflineModeEnabled,
    supportsOfflineMode
  } = useMobileOffline();
  
  const [enabled, setEnabled] = useState<boolean>(false);
  
  // Check if offline mode is enabled on component mount
  useEffect(() => {
    const checkOfflineMode = async () => {
      const offlineModeEnabled = await isOfflineModeEnabled();
      setEnabled(offlineModeEnabled);
    };
    
    checkOfflineMode();
  }, [isOfflineModeEnabled]);
  
  const handleToggleOfflineMode = async () => {
    if (!enabled) {
      const success = await enableOfflineMode();
      setEnabled(success);
    } else {
      // In a real implementation, this would unregister service workers
      // For now, we'll just update the UI state
      setEnabled(false);
    }
  };
  
  if (!supportsOfflineMode) {
    return null;
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-amber-500" />
        )}
        
        <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
        
        {pendingActions > 0 && (
          <Badge variant="outline" className="ml-2">
            {pendingActions} pending
          </Badge>
        )}
        
        {isSyncing && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Upload className="h-3 w-3 mr-1 animate-pulse" />
            Syncing...
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 ml-2">
        <Switch
          checked={enabled}
          onCheckedChange={handleToggleOfflineMode}
          aria-label="Enable offline mode"
        />
        <span className="text-sm">Offline Mode</span>
      </div>
      
      {enabled && (
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-2 h-7 text-xs"
        >
          <Download className="h-3 w-3 mr-1" />
          Download Data
        </Button>
      )}
    </div>
  );
};

export default MobileOfflineToggle;
