
import { Workflow, WorkflowStatus } from "@/types/workflow";

// Define the type for our filters
export interface WorkflowFilters {
  searchQuery: string;
  selectedStatuses: WorkflowStatus[];
}

// Add error states to our return type
export interface UseWorkflowsReturn {
  workflows: Workflow[];
  filteredWorkflows: Workflow[];
  selectedWorkflowId: string | null;
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  workflowToEdit: Workflow | null;
  isTemplatesDialogOpen: boolean;
  filters: WorkflowFilters;
  isLoading: boolean;
  error: Error | null;
  loadError: Error | null;
  saveError: Error | null;
  handleCreateWorkflow: () => void;
  handleOpenTemplates: () => void;
  handleSaveWorkflow: (data: Partial<Workflow>) => void;
  handleUseTemplate: (templateData: Partial<Workflow>) => void;
  handleUpdateWorkflow: (data: Partial<Workflow>) => void;
  handleEditWorkflow: (id: string) => void;
  handleDeleteWorkflow: (id: string) => void;
  handleActivateWorkflow: (id: string) => void;
  handlePauseWorkflow: (id: string) => void;
  handleViewWorkflow: (id: string) => void;
  handleBackToList: () => void;
  updateFilters: (newFilters: Partial<WorkflowFilters>) => void;
  resetFilters: () => void;
  setIsCreateDialogOpen: (isOpen: boolean) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  setIsTemplatesDialogOpen: (isOpen: boolean) => void;
  retryLoadWorkflows: () => void;
}
