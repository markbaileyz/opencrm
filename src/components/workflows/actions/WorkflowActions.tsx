
import React from "react";
import { Workflow } from "@/types/workflow";

export interface WorkflowActionHandlers {
  onActivate: (id: string) => void;
  onPause: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export interface WorkflowNotFoundViewProps {
  onBack: () => void;
}

export const WorkflowNotFoundView: React.FC<WorkflowNotFoundViewProps> = ({ onBack }) => {
  return (
    <div className="text-center p-8">
      <h2 className="text-xl font-medium mb-2">Workflow Not Found</h2>
      <p className="text-muted-foreground mb-4">The workflow you're looking for doesn't exist.</p>
      <Button onClick={onBack}>Back to Workflow List</Button>
    </div>
  );
};

// Import after defining components that use it
import { Button } from "@/components/ui/button";

export interface WorkflowActionsProps extends WorkflowActionHandlers {
  workflow: Workflow;
}

export const useWorkflowActions = (actionHandlers: WorkflowActionHandlers) => {
  const { onActivate, onPause, onEdit, onDelete, onView } = actionHandlers;
  
  return {
    handleActivate: (id: string) => onActivate(id),
    handlePause: (id: string) => onPause(id),
    handleEdit: (id: string) => onEdit(id),
    handleDelete: (id: string) => onDelete(id),
    handleView: (id: string) => onView(id),
  };
};
