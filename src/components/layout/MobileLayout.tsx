
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, Menu, X, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  navigationContent?: React.ReactNode;
  showNotifications?: boolean;
  showSearch?: boolean;
  className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  onBack = () => window.history.back(),
  actions,
  navigationContent,
  showNotifications = false,
  showSearch = false,
  className
}) => {
  const { user } = useAuth();

  return (
    <div className={cn("flex flex-col min-h-full", className)}>
      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-1">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          {navigationContent && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] max-w-sm p-0">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold">{user?.displayName || "Menu"}</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <div className="p-0 overflow-y-auto max-h-[calc(100vh-70px)]">
                  {navigationContent}
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
        </div>
        
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          {showNotifications && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
          )}
          
          {actions}
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
