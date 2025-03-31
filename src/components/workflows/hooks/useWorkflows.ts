
import { useState } from "react";

export interface Workflow {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  type: string;
  createdAt: string;
  executionRate: number;
}

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "wf-1",
      name: "Appointment Reminder",
      description: "Send reminders 24 hours before appointments",
      isActive: true,
      type: "email",
      createdAt: "2023-05-15",
      executionRate: 98,
    },
    {
      id: "wf-2",
      name: "Patient Intake Form",
      description: "Send intake form after appointment scheduling",
      isActive: false,
      type: "form",
      createdAt: "2023-06-22",
      executionRate: 87,
    },
    {
      id: "wf-3",
      name: "Follow-up Survey",
      description: "Send survey 3 days after appointment",
      isActive: true,
      type: "email",
      createdAt: "2023-07-10",
      executionRate: 92,
    },
  ]);

  const handleActivateWorkflow = (workflowId: string) => {
    setWorkflows(
      workflows.map((workflow) =>
        workflow.id === workflowId
          ? { ...workflow, isActive: true }
          : workflow
      )
    );
  };

  const handlePauseWorkflow = (workflowId: string) => {
    setWorkflows(
      workflows.map((workflow) =>
        workflow.id === workflowId
          ? { ...workflow, isActive: false }
          : workflow
      )
    );
  };

  const handleViewWorkflow = (workflowId: string) => {
    console.log(`Viewing workflow: ${workflowId}`);
  };

  return {
    workflows,
    handleActivateWorkflow,
    handlePauseWorkflow,
    handleViewWorkflow,
  };
};
