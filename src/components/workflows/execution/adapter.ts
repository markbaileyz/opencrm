
import { Workflow as WorkflowType } from "@/types/workflow";
import { Workflow as MonitorWorkflow } from "@/components/workflows/execution/WorkflowExecutionMonitor";

/**
 * Adapts the Workflow type from our domain model to the type expected by the WorkflowExecutionMonitor
 */
export const adaptWorkflowsForMonitor = (workflows: WorkflowType[]): MonitorWorkflow[] => {
  return workflows.map(workflow => ({
    id: workflow.id,
    name: workflow.name,
    description: workflow.description,
    active: workflow.status === "active",
    lastExecuted: workflow.lastRun,
    nextExecution: "", // Can be calculated based on trigger type if needed
    category: getCategoryFromWorkflow(workflow),
  }));
};

/**
 * Helper function to determine a category based on workflow properties
 */
const getCategoryFromWorkflow = (workflow: WorkflowType): string => {
  // Determine category based on workflow trigger or other properties
  switch (workflow.trigger) {
    case "new_patient":
      return "Patient Onboarding";
    case "appointment_scheduled":
      return "Appointment Management";
    case "appointment_completed":
      return "Follow-up";
    case "form_submission":
      return "Forms Processing";
    case "scheduled":
      return "Scheduled Tasks";
    case "manual":
      return "Manual Workflows";
    default:
      return "Other";
  }
};
