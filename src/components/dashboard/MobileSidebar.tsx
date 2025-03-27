
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileNavigationMenu from "@/components/ui/mobile-navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileSidebarProps {
  children: React.ReactNode;
}

export const MobileSidebarWrapper: React.FC<MobileSidebarProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  if (!isMobile) {
    return <>{children}</>;
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <MobileSidebarContent />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
};

const MobileSidebarContent = () => {
  const { setOpenMobile } = useSidebar();
  
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t bg-background px-4 py-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:max-w-sm p-0">
            <MobileNavigationMenu />
          </SheetContent>
        </Sheet>
        
        {/* Additional mobile navigation buttons can be added here */}
      </div>
      <div className="h-[60px]"></div> {/* Space for the fixed navigation bar */}
    </>
  );
};

export default MobileSidebarWrapper;
