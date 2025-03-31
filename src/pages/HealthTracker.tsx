
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import HealthTrackerDashboard from "@/components/health-tracker/HealthTrackerDashboard";
import HealthTrackerHeader from "@/components/health-tracker/HealthTrackerHeader";

const HealthTracker = () => {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4 space-y-6">
        <HealthTrackerHeader timeRange={timeRange} setTimeRange={setTimeRange} />
        <HealthTrackerDashboard timeRange={timeRange} />
      </div>
    </DashboardLayout>
  );
};

export default HealthTracker;
