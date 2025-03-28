
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

interface MobileNavigationProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * A mobile-optimized navigation component with slide-out menu
 * Provides a consistent mobile navigation experience across the app
 */
const MobileNavigation = ({
  title = "Menu",
  children,
  actions,
  className,
}: MobileNavigationProps) => {
  return (
    <div className={cn("block md:hidden", className)}>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t bg-background px-4 py-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-primary/5">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:max-w-sm p-0">
            <SheetHeader className="border-b p-4 bg-primary/5">
              <SheetTitle className="text-lg">{title}</SheetTitle>
            </SheetHeader>
            <div className="py-2 flex flex-col">{children}</div>
          </SheetContent>
        </Sheet>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};

interface MobileNavigationItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string | number;
  showChevron?: boolean;
}

/**
 * Individual navigation item for the mobile navigation
 */
export const MobileNavigationItem = ({
  icon,
  label,
  onClick,
  active = false,
  badge,
  showChevron = false,
}: MobileNavigationItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex w-full justify-start h-auto py-3 px-4",
        active ? "bg-primary/10 text-primary font-medium" : ""
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-3 text-current opacity-80">{icon}</span>}
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="ml-auto mr-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
          {badge}
        </span>
      )}
      {showChevron && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
    </Button>
  );
};

export default MobileNavigation;
