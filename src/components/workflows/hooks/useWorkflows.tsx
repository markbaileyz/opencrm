
import { useState, useEffect } from "react";
import { Workflow } from "@/types/workflow";
import { initialWorkflows } from "./initialData";
import { filterWorkflows, loadWorkflows } from "./workflowUtils";
import { useWorkflowActions } from "./workflowActions";
import { WorkflowFilters, UseWorkflowsReturn } from "./types";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Custom hook for workflow management
export const useWorkflows = (): UseWorkflowsReturn => {
  // State for workflows and UI controls
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [workflowToEdit, setWorkflowToEdit] = useState<Workflow | null>(null);
  const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [saveError, setSaveError] = useState<Error | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<WorkflowFilters>({
    searchQuery: "",
    selectedStatuses: [],
  });

  // Get action handlers
  const actions = useWorkflowActions(
    workflows,
    setWorkflows,
    selectedWorkflowId,
    setSelectedWorkflowId,
    setWorkflowToEdit,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setIsTemplatesDialogOpen,
    setFilters,
    setSaveError
  );

  // Load workflows function with error handling
  const loadWorkflowsFromStorage = () => {
    setIsLoading(true);
    setLoadError(null);
    
    try {
      const { workflows: loadedWorkflows, error: loadError } = loadWorkflows();
      
      if (loadError) {
        setLoadError(loadError);
        setWorkflows(initialWorkflows);
      } else if (loadedWorkflows) {
        setWorkflows(loadedWorkflows);
      } else {
        setWorkflows(initialWorkflows);
      }
    } catch (error) {
      console.error("Error in loadWorkflowsFromStorage:", error);
      setLoadError(error instanceof Error ? error : new Error("Failed to load workflows"));
      setWorkflows(initialWorkflows);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to retry loading workflows
  const retryLoadWorkflows = () => {
    loadWorkflowsFromStorage();
  };

  // Load initial workflows on mount
  useEffect(() => {
    loadWorkflowsFromStorage();
  }, []);

  // Update filtered workflows when workflows or filters change
  useEffect(() => {
    const filtered = filterWorkflows(workflows, filters);
    setFilteredWorkflows(filtered);
  }, [workflows, filters]);

  // Set general error if either loadError or saveError is set
  useEffect(() => {
    setError(loadError || saveError);
  }, [loadError, saveError]);

  return {
    workflows,
    filteredWorkflows,
    selectedWorkflowId,
    isCreateDialogOpen,
    isEditDialogOpen,
    workflowToEdit,
    isTemplatesDialogOpen,
    filters,
    isLoading,
    error,
    loadError,
    saveError,
    ...actions,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setIsTemplatesDialogOpen,
    retryLoadWorkflows,
  };
};
