
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
  setFilters: React.Dispatch<React.SetStateAction<WorkflowFilters>>,
  setSaveError: React.Dispatch<React.SetStateAction<Error | null>>
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

  // Handle saving a new workflow with error handling
  const handleSaveWorkflow = (data: Partial<Workflow>) => {
    try {
      const newWorkflow = createWorkflow(data);
      
      const updatedWorkflows = [...workflows, newWorkflow];
      const saveResult = saveWorkflows(updatedWorkflows);
      
      if (saveResult.success) {
        setWorkflows(updatedWorkflows);
        setSaveError(null);
        
        toast({
          title: "Workflow Created",
          description: `"${newWorkflow.name}" has been created successfully.`,
        });
      } else {
        // Handle save error
        setSaveError(saveResult.error);
        toast({
          title: "Error Creating Workflow",
          description: saveResult.error?.message || "Failed to save the new workflow.",
          variant: "destructive"
        });
      }
      
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating workflow:", error);
      const errorObj = error instanceof Error ? error : new Error("Unknown error creating workflow");
      setSaveError(errorObj);
      
      toast({
        title: "Error Creating Workflow",
        description: errorObj.message,
        variant: "destructive"
      });
    }
  };

  // Handle using a template
  const handleUseTemplate = (templateData: Partial<Workflow>) => {
    setIsCreateDialogOpen(true);
    // We'll use the template data as the initial data for the create workflow form
  };

  // Handle updating an existing workflow with error handling
  const handleUpdateWorkflow = (data: Partial<Workflow>) => {
    try {
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
      
      const saveResult = saveWorkflows(updatedWorkflows);
      
      if (saveResult.success) {
        setWorkflows(updatedWorkflows);
        setSaveError(null);
        
        toast({
          title: "Workflow Updated",
          description: `"${updatedWorkflow.name}" has been updated successfully.`,
        });
        
        // If we're viewing the details of this workflow, refresh the view
        if (selectedWorkflowId === updatedWorkflow.id) {
          setSelectedWorkflowId(null);
          // After a brief delay, re-select the workflow to refresh the view
          setTimeout(() => setSelectedWorkflowId(updatedWorkflow.id), 10);
        }
      } else {
        // Handle save error
        setSaveError(saveResult.error);
        toast({
          title: "Error Updating Workflow",
          description: saveResult.error?.message || "Failed to update the workflow.",
          variant: "destructive"
        });
      }
      
      setIsEditDialogOpen(false);
      setWorkflowToEdit(null);
    } catch (error) {
      console.error("Error updating workflow:", error);
      const errorObj = error instanceof Error ? error : new Error("Unknown error updating workflow");
      setSaveError(errorObj);
      
      toast({
        title: "Error Updating Workflow",
        description: errorObj.message,
        variant: "destructive"
      });
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

  // Handle deleting a workflow with error handling
  const handleDeleteWorkflow = (id: string) => {
    try {
      const updatedWorkflows = workflows.filter(w => w.id !== id);
      const saveResult = saveWorkflows(updatedWorkflows);
      
      if (saveResult.success) {
        setWorkflows(updatedWorkflows);
        setSaveError(null);
        
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
      } else {
        // Handle save error
        setSaveError(saveResult.error);
        toast({
          title: "Error Deleting Workflow",
          description: saveResult.error?.message || "Failed to delete the workflow.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error deleting workflow:", error);
      const errorObj = error instanceof Error ? error : new Error("Unknown error deleting workflow");
      setSaveError(errorObj);
      
      toast({
        title: "Error Deleting Workflow",
        description: errorObj.message,
        variant: "destructive"
      });
    }
  };

  // Handle activating a workflow with error handling
  const handleActivateWorkflow = (id: string) => {
    try {
      const workflow = workflows.find(w => w.id === id);
      if (!workflow) return;
      
      const updatedWorkflow = updateWorkflowStatus(workflow, "active");
      const updatedWorkflows = workflows.map(w => 
        w.id === id ? updatedWorkflow : w
      );
      
      const saveResult = saveWorkflows(updatedWorkflows);
      
      if (saveResult.success) {
        setWorkflows(updatedWorkflows);
        setSaveError(null);
        
        toast({
          title: "Workflow Activated",
          description: "The workflow is now active and will process events.",
          variant: "success"
        });
      } else {
        // Handle save error
        setSaveError(saveResult.error);
        toast({
          title: "Error Activating Workflow",
          description: saveResult.error?.message || "Failed to activate the workflow.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error activating workflow:", error);
      const errorObj = error instanceof Error ? error : new Error("Unknown error activating workflow");
      setSaveError(errorObj);
      
      toast({
        title: "Error Activating Workflow",
        description: errorObj.message,
        variant: "destructive"
      });
    }
  };

  // Handle pausing a workflow with error handling
  const handlePauseWorkflow = (id: string) => {
    try {
      const workflow = workflows.find(w => w.id === id);
      if (!workflow) return;
      
      const updatedWorkflow = updateWorkflowStatus(workflow, "paused");
      const updatedWorkflows = workflows.map(w => 
        w.id === id ? updatedWorkflow : w
      );
      
      const saveResult = saveWorkflows(updatedWorkflows);
      
      if (saveResult.success) {
        setWorkflows(updatedWorkflows);
        setSaveError(null);
        
        toast({
          title: "Workflow Paused",
          description: "The workflow has been paused and will not process new events.",
          variant: "info"
        });
      } else {
        // Handle save error
        setSaveError(saveResult.error);
        toast({
          title: "Error Pausing Workflow",
          description: saveResult.error?.message || "Failed to pause the workflow.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error pausing workflow:", error);
      const errorObj = error instanceof Error ? error : new Error("Unknown error pausing workflow");
      setSaveError(errorObj);
      
      toast({
        title: "Error Pausing Workflow",
        description: errorObj.message,
        variant: "destructive"
      });
    }
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
