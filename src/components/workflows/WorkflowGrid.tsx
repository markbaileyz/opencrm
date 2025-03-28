
import React from "react";
import { Workflow } from "@/types/workflow";
import WorkflowCard from "./WorkflowCard";
import WorkflowEmptyState from "./WorkflowEmptyState";

interface WorkflowGridProps {
  workflows: Workflow[];
  onActivate: (id: string) => void;
  onPause: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const WorkflowGrid: React.FC<WorkflowGridProps> = ({
  workflows,
  onActivate,
  onPause,
  onEdit,
  onDelete,
  onView
}) => {
  if (workflows.length === 0) {
    return <WorkflowEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflows.map(workflow => (
        <WorkflowCard
          key={workflow.id}
          workflow={workflow}
          onActivate={onActivate}
          onPause={onPause}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default WorkflowGrid;
