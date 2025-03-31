
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import MobileOfflineToggle from "@/components/mobile/MobileOfflineToggle";
import { useMobileOffline } from "@/utils/mobile-offline-utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  hideOfflineToggle?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children,
  hideOfflineToggle = false
}) => {
  const { isMobile } = useMobileOffline();
  
  if (!isMobile) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {children}
      </main>
      
      {!hideOfflineToggle && (
        <div className="sticky bottom-0 p-2 bg-background border-t border-border z-10">
          <MobileOfflineToggle />
        </div>
      )}
      
      <Toaster />
    </div>
  );
};

export default MobileLayout;
