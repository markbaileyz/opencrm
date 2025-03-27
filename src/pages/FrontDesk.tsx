
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ResponsiveContainer from "@/components/ui/responsive-container";
import MobileFrontDesk from "@/components/front-desk/MobileFrontDesk";
import DesktopFrontDesk from "@/components/front-desk/DesktopFrontDesk";

const FrontDesk = () => {
  return (
    <DashboardLayout>
      <ResponsiveContainer
        mobileView={<MobileFrontDesk />}
        desktopView={<DesktopFrontDesk />}
      />
    </DashboardLayout>
  );
};

export default FrontDesk;
