
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WorkflowListHeaderProps {
  onCreateWorkflow: () => void;
  onOpenTemplates: () => void;
}

const WorkflowListHeader: React.FC<WorkflowListHeaderProps> = ({ 
  onCreateWorkflow, 
  onOpenTemplates 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Workflows</h1>
      <div className="flex space-x-2">
        <Button onClick={onOpenTemplates} variant="outline">
          Use Template
        </Button>
        <Button onClick={onCreateWorkflow}>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>
    </div>
  );
};

export default WorkflowListHeader;
