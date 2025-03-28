
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Workflow, WorkflowStep, WorkflowStatus } from "@/types/workflow";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Sample initial workflows for demonstration
const initialWorkflows: Workflow[] = [
  {
    id: "wf-1",
    name: "Patient Welcome Sequence",
    description: "Send welcome emails to new patients",
    status: "active",
    trigger: "new_patient",
    steps: [
      {
        id: uuidv4(),
        type: "email",
        config: {
          subject: "Welcome to our clinic!",
          content: "Thank you for choosing our clinic. Here's what you need to know for your first visit.",
          recipient: "{{patient.email}}"
        }
      },
      {
        id: uuidv4(),
        type: "wait",
        config: {
          delay: "2 days"
        }
      },
      {
        id: uuidv4(),
        type: "task",
        config: {
          subject: "Follow up with new patient",
          description: "Call the patient to ensure they received welcome materials and address any questions.",
          assignee: "{{user.id}}"
        }
      }
    ],
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-01T14:45:00Z",
    lastRun: "2023-06-10T09:15:00Z",
    createdBy: "user-1"
  },
  {
    id: "wf-2",
    name: "Appointment Reminder",
    description: "Send reminders before scheduled appointments",
    status: "active",
    trigger: "appointment_scheduled",
    steps: [
      {
        id: uuidv4(),
        type: "wait",
        config: {
          delay: "3 days before appointment"
        }
      },
      {
        id: uuidv4(),
        type: "email",
        config: {
          subject: "Your Upcoming Appointment",
          content: "This is a reminder about your appointment scheduled for {{appointment.date}} at {{appointment.time}}.",
          recipient: "{{patient.email}}"
        }
      },
      {
        id: uuidv4(),
        type: "sms",
        config: {
          message: "Reminder: Your appointment is tomorrow at {{appointment.time}}. Reply C to confirm or R to reschedule.",
          recipient: "{{patient.phone}}"
        }
      }
    ],
    createdAt: "2023-04-20T11:20:00Z",
    updatedAt: "2023-05-25T13:10:00Z",
    lastRun: "2023-06-12T08:45:00Z",
    createdBy: "user-1"
  },
  {
    id: "wf-3",
    name: "Follow-up Survey",
    description: "Send survey after appointments to gather feedback",
    status: "paused",
    trigger: "appointment_completed",
    steps: [
      {
        id: uuidv4(),
        type: "wait",
        config: {
          delay: "1 day after appointment"
        }
      },
      {
        id: uuidv4(),
        type: "email",
        config: {
          subject: "How was your appointment?",
          content: "Please take a moment to complete this survey about your recent appointment.",
          recipient: "{{patient.email}}"
        }
      }
    ],
    createdAt: "2023-02-10T09:00:00Z",
    updatedAt: "2023-05-05T16:30:00Z",
    lastRun: "2023-05-20T14:15:00Z",
    createdBy: "user-2"
  },
  {
    id: "wf-4",
    name: "Medication Reminder",
    description: "Regular reminders for medication adherence",
    status: "draft",
    trigger: "scheduled",
    steps: [
      {
        id: uuidv4(),
        type: "condition",
        config: {
          condition: "patient.needs_reminder == true"
        }
      },
      {
        id: uuidv4(),
        type: "email",
        config: {
          subject: "Medication Reminder",
          content: "This is a reminder to take your medication as prescribed.",
          recipient: "{{patient.email}}"
        }
      }
    ],
    createdAt: "2023-03-25T13:45:00Z",
    updatedAt: "2023-03-25T13:45:00Z",
    createdBy: "user-1"
  }
];

// Define the type for our filters
interface WorkflowFilters {
  searchQuery: string;
  selectedStatuses: WorkflowStatus[];
}

// Custom hook for workflow management
export const useWorkflows = () => {
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
  
  const { toast } = useToast();
  const navigate = useNavigate();

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
    
    setFilteredWorkflows(filtered);
  }, [workflows, filters]);

  // Helper to save workflows to localStorage
  const saveWorkflows = (updatedWorkflows: Workflow[]) => {
    localStorage.setItem("workflows", JSON.stringify(updatedWorkflows));
  };

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
    const newWorkflow: Workflow = {
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
    const updatedWorkflows = workflows.map(w => 
      w.id === id ? { ...w, status: "active" as WorkflowStatus, updatedAt: new Date().toISOString() } : w
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
    const updatedWorkflows = workflows.map(w => 
      w.id === id ? { ...w, status: "paused" as WorkflowStatus, updatedAt: new Date().toISOString() } : w
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
    workflows,
    filteredWorkflows,
    selectedWorkflowId,
    isCreateDialogOpen,
    isEditDialogOpen,
    workflowToEdit,
    isTemplatesDialogOpen,
    filters,
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
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setIsTemplatesDialogOpen,
  };
};
