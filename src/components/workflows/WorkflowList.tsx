import React, { useState } from "react";
import { Workflow, WorkflowStatus } from "@/types/workflow";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import WorkflowGrid from "./WorkflowGrid";
import WorkflowFilters from "./WorkflowFilters";
import WorkflowFormDialog from "./WorkflowFormDialog";
import WorkflowDetailView from "./WorkflowDetailView";
import WorkflowTemplates from "./WorkflowTemplates";

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

const WorkflowList: React.FC = () => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [workflowToEdit, setWorkflowToEdit] = useState<Workflow | null>(null);
  const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<WorkflowStatus[]>([]);
  
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
  
  const filteredWorkflows = workflows.filter(workflow => {
    // Filter by search query
    const searchMatch = 
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(workflow.status);
    
    return searchMatch && statusMatch;
  });
  
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatuses([]);
  };
  
  // If a workflow is selected, show its details
  if (selectedWorkflowId) {
    const selectedWorkflow = workflows.find(w => w.id === selectedWorkflowId);
    
    if (!selectedWorkflow) {
      return (
        <div className="text-center p-8">
          <h2 className="text-xl font-medium mb-2">Workflow Not Found</h2>
          <p className="text-muted-foreground mb-4">The workflow you're looking for doesn't exist.</p>
          <Button onClick={handleBackToList}>Back to Workflow List</Button>
        </div>
      );
    }
    
    return (
      <WorkflowDetailView
        workflow={selectedWorkflow}
        onBack={handleBackToList}
        onEdit={handleEditWorkflow}
        onDelete={handleDeleteWorkflow}
        onActivate={handleActivateWorkflow}
        onPause={handlePauseWorkflow}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Workflows</h1>
        <div className="flex space-x-2">
          <Button onClick={handleOpenTemplates} variant="outline">
            Use Template
          </Button>
          <Button onClick={handleCreateWorkflow}>
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </div>
      
      <WorkflowFilters
        onSearchChange={setSearchQuery}
        onStatusFilterChange={setSelectedStatuses}
        onReset={resetFilters}
        searchValue={searchQuery}
        selectedStatuses={selectedStatuses}
      />
      
      <WorkflowGrid
        workflows={filteredWorkflows}
        onActivate={handleActivateWorkflow}
        onPause={handlePauseWorkflow}
        onEdit={handleEditWorkflow}
        onDelete={handleDeleteWorkflow}
        onView={handleViewWorkflow}
      />
      
      <WorkflowFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleSaveWorkflow}
        title="Create Workflow"
      />
      
      {workflowToEdit && (
        <WorkflowFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleUpdateWorkflow}
          initialData={workflowToEdit}
          title="Edit Workflow"
        />
      )}

      <WorkflowTemplates
        open={isTemplatesDialogOpen}
        onOpenChange={setIsTemplatesDialogOpen}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  );
};

export default WorkflowList;
