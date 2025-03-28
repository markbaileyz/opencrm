
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WorkflowAnalyticsDashboard from "@/components/workflows/execution/analytics/WorkflowAnalyticsDashboard";

const WorkflowAnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <WorkflowAnalyticsDashboard />
      </div>
    </DashboardLayout>
  );
};

export default WorkflowAnalyticsPage;
