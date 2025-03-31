
import { Workflow } from "../hooks/useWorkflows";

// Define the shape of workflow for the monitor component
export interface MonitorWorkflow {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "error";
  type: string;
  lastExecution?: string;
  successRate: number;
}

// Adapter to transform workflows for the monitor
export const adaptWorkflowsForMonitor = (workflows: Workflow[]): MonitorWorkflow[] => {
  return workflows.map(workflow => ({
    id: workflow.id,
    name: workflow.name,
    description: workflow.description,
    status: workflow.isActive ? "active" : "paused",
    type: workflow.type,
    lastExecution: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    successRate: workflow.executionRate,
  }));
};
