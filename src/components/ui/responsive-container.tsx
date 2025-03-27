
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  breakpoint?: "sm" | "md" | "lg" | "xl";
  mobileView?: React.ReactNode;
  desktopView?: React.ReactNode;
  forceMobile?: boolean;
  forceDesktop?: boolean;
}

/**
 * A responsive container that shows different content based on screen size
 * If mobileView/desktopView are provided, they'll be shown at appropriate breakpoints
 * Otherwise, the children will be shown with responsive styling
 */
const ResponsiveContainer = ({
  children,
  className,
  breakpoint = "md",
  mobileView,
  desktopView,
  forceMobile = false,
  forceDesktop = false,
  ...props
}: ResponsiveContainerProps) => {
  const isMobile = useIsMobile();
  const breakpointMap = {
    sm: "sm:block",
    md: "md:block",
    lg: "lg:block",
    xl: "xl:block",
  };

  // Force specific view if requested
  if (forceMobile && mobileView) return <>{mobileView}</>;
  if (forceDesktop && desktopView) return <>{desktopView}</>;
  
  // Use isMobile hook to determine which view to render if auto-detection preferred
  if ((mobileView || desktopView) && isMobile !== undefined) {
    if (isMobile && mobileView) return <>{mobileView}</>;
    if (!isMobile && desktopView) return <>{desktopView}</>;
  }

  // If specific mobile and desktop views are provided but no auto-detection
  if (mobileView || desktopView) {
    return (
      <div className={cn(className)} {...props}>
        {/* Mobile view */}
        {mobileView && (
          <div className={`block ${breakpointMap[breakpoint].replace("block", "hidden")}`}>
            {mobileView}
          </div>
        )}
        
        {/* Desktop view */}
        {desktopView && (
          <div className={`hidden ${breakpointMap[breakpoint]}`}>
            {desktopView}
          </div>
        )}
        
        {/* Both views hidden, show children */}
        {!mobileView && !desktopView && children}
      </div>
    );
  }

  // Default behavior just applies the className
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
