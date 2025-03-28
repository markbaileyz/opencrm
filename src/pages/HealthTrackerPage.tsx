
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import HealthTrackerHeader from "@/components/health-tracker/HealthTrackerHeader";
import HealthTrackerDashboard from "@/components/health-tracker/HealthTrackerDashboard";

const HealthTrackerPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <HealthTrackerHeader />
        <HealthTrackerDashboard />
      </div>
    </DashboardLayout>
  );
};

export default HealthTrackerPage;
