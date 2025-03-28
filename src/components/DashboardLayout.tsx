
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/data/sidebarItems";
import SidebarContent from "@/components/sidebar/SidebarContent";
import SidebarToggle from "@/components/sidebar/SidebarToggle";
import UserInfo from "@/components/sidebar/UserInfo";
import LogoutButton from "@/components/sidebar/LogoutButton";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import VersionDisplay from "@/components/common/VersionDisplay";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen">
      <SidebarToggle 
        isOpen={isSidebarOpen} 
        onClick={toggleSidebar} 
      />

      <aside
        className={cn(
          "w-64 flex-shrink-0 bg-secondary border-r border-r-muted py-4 px-2 fixed h-full z-40 md:relative",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-300 ease-in-out md:translate-x-0"
        )}
      >
        <UserInfo />
        <SidebarContent sidebarItems={sidebarItems} />
        <Separator className="my-6" />
        <div className="p-4">
          <LogoutButton />
          <VersionDisplay className="mt-4 text-center" />
        </div>
      </aside>

      <div className="flex-1 p-6 overflow-auto pb-16 md:pb-6">
        {children}
      </div>
      
      {isMobile && <MobileBottomNav />}
    </div>
  );
};

export default DashboardLayout;
