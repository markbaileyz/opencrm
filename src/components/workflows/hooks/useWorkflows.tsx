
import { useState } from "react";
import { Workflow, WorkflowStatus } from "@/types/workflow";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

// Sample data (this would typically come from an API/database)
const initialWorkflows: Workflow[] = [
  {
    id: "workflow-1",
    name: "New Patient Welcome",
    description: "Sends a welcome email to new patients and creates a follow-up task",
    status: "active",
    trigger: "new_patient",
    steps: [
      {
        type: "email",
        config: {
          subject: "Welcome to Our Practice",
          content: "Dear patient, welcome to our healthcare practice. We're glad to have you with us.",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "24"
        }
      },
      {
        type: "task",
        config: {
          subject: "Follow up with new patient",
          description: "Call the patient to ensure they have everything they need",
          assignee: "nurse"
        }
      }
    ],
    createdAt: "2023-05-10T08:00:00Z",
    updatedAt: "2023-05-12T10:30:00Z",
    lastRun: "2023-06-01T14:22:00Z",
    createdBy: "admin"
  },
  {
    id: "workflow-2",
    name: "Appointment Reminder",
    description: "Sends reminder notifications before scheduled appointments",
    status: "active",
    trigger: "appointment_scheduled",
    steps: [
      {
        type: "wait",
        config: {
          delay: "48"
        }
      },
      {
        type: "email",
        config: {
          subject: "Upcoming Appointment Reminder",
          content: "This is a reminder about your upcoming appointment. Please arrive 15 minutes early.",
          recipient: "patient"
        }
      },
      {
        type: "sms",
        config: {
          message: "Reminder: You have an appointment tomorrow. Reply C to confirm or R to reschedule.",
          recipient: "patient"
        }
      }
    ],
    createdAt: "2023-05-15T09:20:00Z",
    updatedAt: "2023-05-15T09:20:00Z",
    lastRun: "2023-06-02T08:15:00Z",
    createdBy: "admin"
  },
  {
    id: "workflow-3",
    name: "Follow-up Survey",
    description: "Sends a satisfaction survey after appointments",
    status: "paused",
    trigger: "appointment_completed",
    steps: [
      {
        type: "wait",
        config: {
          delay: "24"
        }
      },
      {
        type: "email",
        config: {
          subject: "How was your appointment?",
          content: "We value your feedback. Please take a moment to complete this short survey about your recent visit.",
          recipient: "patient"
        }
      }
    ],
    createdAt: "2023-05-20T13:40:00Z",
    updatedAt: "2023-05-22T11:05:00Z",
    createdBy: "admin"
  },
  {
    id: "workflow-4",
    name: "Prescription Renewal",
    description: "Notify patients when their prescriptions are due for renewal",
    status: "draft",
    trigger: "scheduled",
    steps: [
      {
        type: "condition",
        config: {
          condition: "days_until_renewal <= 7"
        }
      },
      {
        type: "email",
        config: {
          subject: "Prescription Renewal Reminder",
          content: "Your prescription will expire soon. Please contact us to arrange a renewal.",
          recipient: "patient"
        }
      }
    ],
    createdAt: "2023-05-25T16:10:00Z",
    updatedAt: "2023-05-25T16:10:00Z",
    createdBy: "admin"
  }
];

export interface WorkflowsFilter {
  searchQuery: string;
  selectedStatuses: WorkflowStatus[];
}

export const useWorkflows = () => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [workflowToEdit, setWorkflowToEdit] = useState<Workflow | null>(null);
  const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<WorkflowsFilter>({
    searchQuery: "",
    selectedStatuses: [],
  });
  
  const handleCreateWorkflow = () => {
    setIsCreateDialogOpen(true);
  };

  const handleOpenTemplates = () => {
    setIsTemplatesDialogOpen(true);
  };
  
  const handleSaveWorkflow = (workflowData: Omit<Workflow, "id">) => {
    const newWorkflow: Workflow = {
      ...workflowData,
      id: `workflow-${uuidv4()}`,
    };
    
    setWorkflows(prev => [newWorkflow, ...prev]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Workflow Created",
      description: "The workflow has been created successfully.",
    });
  };

  const handleUseTemplate = (template: Omit<Workflow, "id">) => {
    const newWorkflow: Workflow = {
      ...template,
      id: `workflow-${uuidv4()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current-user",
    };
    
    setWorkflows(prev => [newWorkflow, ...prev]);
    setIsTemplatesDialogOpen(false);
    
    toast({
      title: "Template Applied",
      description: "The workflow template has been applied successfully.",
    });
  };
  
  const handleUpdateWorkflow = (workflowData: Omit<Workflow, "id">) => {
    if (!workflowToEdit) return;
    
    const updatedWorkflow: Workflow = {
      ...workflowData,
      id: workflowToEdit.id,
    };
    
    setWorkflows(prev => 
      prev.map(workflow => workflow.id === updatedWorkflow.id ? updatedWorkflow : workflow)
    );
    
    setIsEditDialogOpen(false);
    setWorkflowToEdit(null);
    
    toast({
      title: "Workflow Updated",
      description: "The workflow has been updated successfully.",
    });
    
    // If we're currently viewing this workflow, update the view
    if (selectedWorkflowId === updatedWorkflow.id) {
      setSelectedWorkflowId(null);
      setTimeout(() => setSelectedWorkflowId(updatedWorkflow.id), 0);
    }
  };
  
  const handleEditWorkflow = (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (workflow) {
      setWorkflowToEdit(workflow);
      setIsEditDialogOpen(true);
    }
  };
  
  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(prev => prev.filter(workflow => workflow.id !== id));
    
    if (selectedWorkflowId === id) {
      setSelectedWorkflowId(null);
    }
    
    toast({
      title: "Workflow Deleted",
      description: "The workflow has been deleted successfully.",
    });
  };
  
  const handleActivateWorkflow = (id: string) => {
    setWorkflows(prev => 
      prev.map(workflow => 
        workflow.id === id ? { ...workflow, status: "active" as const } : workflow
      )
    );
    
    toast({
      title: "Workflow Activated",
      description: "The workflow has been activated successfully.",
    });
  };
  
  const handlePauseWorkflow = (id: string) => {
    setWorkflows(prev => 
      prev.map(workflow => 
        workflow.id === id ? { ...workflow, status: "paused" as const } : workflow
      )
    );
    
    toast({
      title: "Workflow Paused",
      description: "The workflow has been paused successfully.",
    });
  };
  
  const handleViewWorkflow = (id: string) => {
    setSelectedWorkflowId(id);
  };
  
  const handleBackToList = () => {
    setSelectedWorkflowId(null);
  };
  
  const filterWorkflows = (workflows: Workflow[], filters: WorkflowsFilter) => {
    return workflows.filter(workflow => {
      // Filter by search query
      const searchMatch = 
        workflow.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        workflow.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      // Filter by status
      const statusMatch = filters.selectedStatuses.length === 0 || 
                          filters.selectedStatuses.includes(workflow.status);
      
      return searchMatch && statusMatch;
    });
  };

  const updateFilters = (newFilters: Partial<WorkflowsFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedStatuses: [],
    });
  };
  
  const filteredWorkflows = filterWorkflows(workflows, filters);
  
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
