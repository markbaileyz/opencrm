
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileFrontDesk from "@/components/front-desk/MobileFrontDesk";
import DesktopFrontDesk from "@/components/front-desk/DesktopFrontDesk";

const FrontDesk = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <DashboardLayout>
      {isMobile ? <MobileFrontDesk /> : <DesktopFrontDesk />}
    </DashboardLayout>
  );
};

export default FrontDesk;
