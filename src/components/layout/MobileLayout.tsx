
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  navigationContent?: React.ReactNode;
  className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  onBack,
  actions,
  navigationContent,
  className
}) => {
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
              <SheetContent side="left" className="w-[80%] max-w-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                {navigationContent}
              </SheetContent>
            </Sheet>
          )}
          
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
        </div>
        
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
