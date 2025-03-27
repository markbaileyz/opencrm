
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import FrontDeskDashboard from "@/components/front-desk/FrontDeskDashboard";

const FrontDeskPage: React.FC = () => {
  return (
    <DashboardLayout>
      <FrontDeskDashboard />
    </DashboardLayout>
  );
};

export default FrontDeskPage;
