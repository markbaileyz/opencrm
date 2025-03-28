
import React from "react";
import { Activity } from "lucide-react";

const WorkflowExecutionEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-3 mb-4">
        <Activity className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No Active Workflows</h3>
      <p className="text-muted-foreground max-w-md">
        There are no workflows currently running. Activate a workflow to see its execution progress here.
      </p>
    </div>
  );
};

export default WorkflowExecutionEmpty;
