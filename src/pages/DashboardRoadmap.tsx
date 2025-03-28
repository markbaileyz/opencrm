
import React from "react";
import Roadmap from "@/pages/Roadmap";
import DashboardLayout from "@/components/DashboardLayout";

const DashboardRoadmap = () => {
  return (
    <DashboardLayout>
      <Roadmap isDashboard={true} />
    </DashboardLayout>
  );
};

export default DashboardRoadmap;
