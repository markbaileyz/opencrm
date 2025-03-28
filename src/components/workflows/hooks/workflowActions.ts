
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Workflow } from "@/types/workflow";
import { WorkflowFilters } from "./types";
import { saveWorkflows, createWorkflow, updateWorkflowStatus } from "./workflowUtils";

export const useWorkflowActions = (
  workflows: Workflow[],
  setWorkflows: React.Dispatch<React.SetStateAction<Workflow[]>>,
  selectedWorkflowId: string | null,
  setSelectedWorkflowId: React.Dispatch<React.SetStateAction<string | null>>,
  setWorkflowToEdit: React.Dispatch<React.SetStateAction<Workflow | null>>,
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsTemplatesDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setFilters: React.Dispatch<React.SetStateAction<WorkflowFilters>>
) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle creating a new workflow
  const handleCreateWorkflow = () => {
    setIsCreateDialogOpen(true);
  };

  // Handle opening templates dialog
  const handleOpenTemplates = () => {
    setIsTemplatesDialogOpen(true);
  };

  // Handle saving a new workflow
  const handleSaveWorkflow = (data: Partial<Workflow>) => {
    const newWorkflow = createWorkflow(data);
    
    const updatedWorkflows = [...workflows, newWorkflow];
    setWorkflows(updatedWorkflows);
    saveWorkflows(updatedWorkflows);
    
    toast({
      title: "Workflow Created",
      description: `"${newWorkflow.name}" has been created successfully.`,
    });
    
    setIsCreateDialogOpen(false);
  };

  // Handle using a template
  const handleUseTemplate = (templateData: Partial<Workflow>) => {
    setIsCreateDialogOpen(true);
    
    // We'll use the template data as the initial data for the create workflow form
    // This will happen in the WorkflowFormDialog component
  };

  // Handle updating an existing workflow
  const handleUpdateWorkflow = (data: Partial<Workflow>) => {
    if (!setWorkflowToEdit) return;
    
    const workflowToEdit = workflows.find(w => w.id === selectedWorkflowId);
    if (!workflowToEdit) return;
    
    const updatedWorkflow: Workflow = {
      ...workflowToEdit,
      name: data.name || workflowToEdit.name,
      description: data.description || workflowToEdit.description,
      status: data.status || workflowToEdit.status,
      trigger: data.trigger || workflowToEdit.trigger,
      steps: data.steps || workflowToEdit.steps,
      updatedAt: new Date().toISOString(),
    };
    
    const updatedWorkflows = workflows.map(wf => 
      wf.id === updatedWorkflow.id ? updatedWorkflow : wf
    );
    
    setWorkflows(updatedWorkflows);
    saveWorkflows(updatedWorkflows);
    
    toast({
      title: "Workflow Updated",
      description: `"${updatedWorkflow.name}" has been updated successfully.`,
    });
    
    setIsEditDialogOpen(false);
    setWorkflowToEdit(null);
    
    // If we're viewing the details of this workflow, refresh the view
    if (selectedWorkflowId === updatedWorkflow.id) {
      setSelectedWorkflowId(null);
      // After a brief delay, re-select the workflow to refresh the view
      setTimeout(() => setSelectedWorkflowId(updatedWorkflow.id), 10);
    }
  };

  // Handle editing a workflow
  const handleEditWorkflow = (id: string) => {
    const workflowToEdit = workflows.find(w => w.id === id);
    if (workflowToEdit) {
      setWorkflowToEdit(workflowToEdit);
      setIsEditDialogOpen(true);
    }
  };

  // Handle deleting a workflow
  const handleDeleteWorkflow = (id: string) => {
    const updatedWorkflows = workflows.filter(w => w.id !== id);
    setWorkflows(updatedWorkflows);
    saveWorkflows(updatedWorkflows);
    
    toast({
      title: "Workflow Deleted",
      description: "The workflow has been deleted successfully.",
      variant: "destructive"
    });
    
    // If we're viewing the details of this workflow, go back to the list
    if (selectedWorkflowId === id) {
      setSelectedWorkflowId(null);
      navigate('/workflows');
    }
  };

  // Handle activating a workflow
  const handleActivateWorkflow = (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (!workflow) return;
    
    const updatedWorkflow = updateWorkflowStatus(workflow, "active");
    const updatedWorkflows = workflows.map(w => 
      w.id === id ? updatedWorkflow : w
    );
    
    setWorkflows(updatedWorkflows);
    saveWorkflows(updatedWorkflows);
    
    toast({
      title: "Workflow Activated",
      description: "The workflow is now active and will process events.",
      variant: "success"
    });
  };

  // Handle pausing a workflow
  const handlePauseWorkflow = (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (!workflow) return;
    
    const updatedWorkflow = updateWorkflowStatus(workflow, "paused");
    const updatedWorkflows = workflows.map(w => 
      w.id === id ? updatedWorkflow : w
    );
    
    setWorkflows(updatedWorkflows);
    saveWorkflows(updatedWorkflows);
    
    toast({
      title: "Workflow Paused",
      description: "The workflow has been paused and will not process new events.",
      variant: "info"
    });
  };

  // Handle viewing a workflow's details
  const handleViewWorkflow = (id: string) => {
    setSelectedWorkflowId(id);
    navigate(`/workflows/detail/${id}`);
  };

  // Handle going back to the workflow list
  const handleBackToList = () => {
    setSelectedWorkflowId(null);
    navigate('/workflows');
  };

  // Update filters
  const updateFilters = (newFilters: Partial<WorkflowFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedStatuses: [],
    });
  };

  return {
    handleCreateWorkflow,
    handleOpenTemplates,
    handleSaveWorkflow,
    handleUseTemplate,
    handleUpdateWorkflow,
    handleEditWorkflow,
    handleDeleteWorkflow,
    handleActivateWorkflow,
    handlePauseWorkflow,
    handleViewWorkflow,
    handleBackToList,
    updateFilters,
    resetFilters,
  };
};
