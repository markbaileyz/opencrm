
import { Workflow, WorkflowStatus } from "@/types/workflow";
import { WorkflowFilters } from "./types";

// Helper to load workflows from localStorage with error handling
export const loadWorkflows = (): { workflows: Workflow[] | null; error: Error | null } => {
  try {
    const storedWorkflows = localStorage.getItem("workflows");
    if (storedWorkflows) {
      const parsedWorkflows = JSON.parse(storedWorkflows);
      return { workflows: parsedWorkflows, error: null };
    }
    return { workflows: null, error: null };
  } catch (error) {
    console.error("Failed to load workflows from localStorage:", error);
    return { 
      workflows: null, 
      error: new Error("Failed to load workflows. The stored data may be corrupted.") 
    };
  }
};

// Helper to save workflows to localStorage with error handling
export const saveWorkflows = (workflows: Workflow[]): { success: boolean; error: Error | null } => {
  try {
    localStorage.setItem("workflows", JSON.stringify(workflows));
    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to save workflows to localStorage:", error);
    return { 
      success: false, 
      error: new Error("Failed to save workflows. Please try again or check your browser storage settings.") 
    };
  }
};

// Filter workflows based on search query and status filters
export const filterWorkflows = (workflows: Workflow[], filters: WorkflowFilters): Workflow[] => {
  let filtered = [...workflows];
  
  // Apply search filter
  if (filters.searchQuery) {
    const search = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      workflow => 
        workflow.name.toLowerCase().includes(search) || 
        workflow.description.toLowerCase().includes(search)
    );
  }
  
  // Apply status filter
  if (filters.selectedStatuses.length > 0) {
    filtered = filtered.filter(
      workflow => filters.selectedStatuses.includes(workflow.status)
    );
  }
  
  return filtered;
};

// Create a new workflow object
export const createWorkflow = (data: Partial<Workflow>): Workflow => {
  return {
    id: `wf-${Date.now()}`,
    name: data.name || "Untitled Workflow",
    description: data.description || "",
    status: data.status || "draft",
    trigger: data.trigger || "manual",
    steps: data.steps || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "current-user", // This would come from auth context in a real app
  };
};

// Update a workflow's status
export const updateWorkflowStatus = (workflow: Workflow, status: WorkflowStatus): Workflow => {
  return {
    ...workflow,
    status,
    updatedAt: new Date().toISOString()
  };
};
