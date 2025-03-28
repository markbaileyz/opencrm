
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import HealthTrackerHeader from "@/components/health-tracker/HealthTrackerHeader";
import HealthTrackerDashboard from "@/components/health-tracker/HealthTrackerDashboard";

const HealthTrackerPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <HealthTrackerHeader timeRange={timeRange} setTimeRange={setTimeRange} />
        <HealthTrackerDashboard />
      </div>
    </DashboardLayout>
  );
};

export default HealthTrackerPage;
