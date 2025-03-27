
import React from "react";
import { cn } from "@/lib/utils";

export interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  breakpoint?: "sm" | "md" | "lg" | "xl";
  mobileView?: React.ReactNode;
  desktopView?: React.ReactNode;
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
  ...props
}: ResponsiveContainerProps) => {
  const breakpointMap = {
    sm: "sm:block",
    md: "md:block",
    lg: "lg:block",
    xl: "xl:block",
  };

  // If specific mobile and desktop views are provided
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
        
        {/* Both views hidden, show children as fallback */}
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
