
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WorkflowAnalyticsDashboard from "@/components/workflows/analytics/WorkflowAnalyticsDashboard";

const WorkflowAnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <WorkflowAnalyticsDashboard />
    </DashboardLayout>
  );
};

export default WorkflowAnalyticsPage;
