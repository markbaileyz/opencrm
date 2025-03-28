
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WorkflowAnalyticsDashboard from "@/components/workflows/analytics/WorkflowAnalyticsDashboard";

const WorkflowAnalytics = () => {
  return (
    <DashboardLayout>
      <WorkflowAnalyticsDashboard />
    </DashboardLayout>
  );
};

export default WorkflowAnalytics;
