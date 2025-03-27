import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ResponsiveContainerProps {
  children?: React.ReactNode;
  mobileView?: React.ReactNode;
  desktopView?: React.ReactNode;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children,
  mobileView,
  desktopView
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // If specific mobile and desktop views are provided, use them
  if (mobileView && desktopView) {
    return isMobile ? <>{mobileView}</> : <>{desktopView}</>;
  }
  
  // Otherwise just render the children
  return <>{children}</>;
};

export default ResponsiveContainer;
