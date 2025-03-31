
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const WorkflowAnalytics = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Workflow Analytics</h1>
        <div className="bg-muted/30 p-6 rounded-md text-center">
          <p className="text-lg mb-4">Workflow analytics dashboard coming soon</p>
          <p className="text-sm text-muted-foreground">
            This section will include workflow performance metrics, execution history, and optimization suggestions
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkflowAnalytics;
