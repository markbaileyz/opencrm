
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
import { Menu, X } from "lucide-react";

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
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[350px]">
            <SheetHeader className="border-b pb-4">
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">{children}</div>
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
}: MobileNavigationItemProps) => {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={cn(
        "flex w-full justify-start",
        active ? "bg-primary/10 hover:bg-primary/20" : ""
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
          {badge}
        </span>
      )}
    </Button>
  );
};

export default MobileNavigation;
