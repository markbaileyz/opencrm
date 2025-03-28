
import { useState, useEffect } from "react";
import { Workflow } from "@/types/workflow";
import { initialWorkflows } from "./initialData";
import { filterWorkflows } from "./workflowUtils";
import { useWorkflowActions } from "./workflowActions";
import { WorkflowFilters, UseWorkflowsReturn } from "./types";

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
    setFilters
  );

  // Load initial workflows on mount (from localStorage if available)
  useEffect(() => {
    const storedWorkflows = localStorage.getItem("workflows");
    if (storedWorkflows) {
      try {
        setWorkflows(JSON.parse(storedWorkflows));
      } catch (error) {
        console.error("Failed to parse workflows from localStorage:", error);
        setWorkflows(initialWorkflows);
      }
    } else {
      setWorkflows(initialWorkflows);
    }
  }, []);

  // Update filtered workflows when workflows or filters change
  useEffect(() => {
    const filtered = filterWorkflows(workflows, filters);
    setFilteredWorkflows(filtered);
  }, [workflows, filters]);

  return {
    workflows,
    filteredWorkflows,
    selectedWorkflowId,
    isCreateDialogOpen,
    isEditDialogOpen,
    workflowToEdit,
    isTemplatesDialogOpen,
    filters,
    ...actions,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setIsTemplatesDialogOpen,
  };
};
