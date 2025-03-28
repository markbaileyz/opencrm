
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WorkflowList from "@/components/workflows/WorkflowList";

const Workflows = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <WorkflowList />
      </div>
    </DashboardLayout>
  );
};

export default Workflows;
