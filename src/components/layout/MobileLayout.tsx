
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import MobileOfflineToggle from "@/components/mobile/MobileOfflineToggle";
import { useMobileOffline } from "@/utils/mobile-offline-utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  hideOfflineToggle?: boolean;
  title?: string;
  navigationContent?: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children,
  hideOfflineToggle = false,
  title,
  navigationContent
}) => {
  const { isMobile } = useMobileOffline();
  
  if (!isMobile) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {title && (
        <header className="sticky top-0 z-20 bg-background border-b border-border p-4">
          <h1 className="text-lg font-bold">{title}</h1>
        </header>
      )}
      
      {navigationContent && (
        <nav className="bg-muted">
          {navigationContent}
        </nav>
      )}
      
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
