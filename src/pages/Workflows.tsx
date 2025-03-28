
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WorkflowList from "@/components/workflows/WorkflowList";
import { 
  Workflow, 
  WorkflowStatus, 
  WorkflowExecution 
} from "@/types/workflow";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { format, subDays, addDays } from "date-fns";
import { 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  BarChart2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data - in a real app, this would come from an API
const mockWorkflows: Workflow[] = [
  {
    id: "1",
    name: "New Patient Welcome",
    description: "Send welcome email when a new patient is created",
    status: "active",
    trigger: "patient_created",
    conditions: [],
    actions: [
      {
        id: "action-1",
        type: "send_email",
        name: "Send welcome email",
        template: "welcome-email"
      }
    ],
    createdAt: format(subDays(new Date(), 30), "yyyy-MM-dd'T'HH:mm:ss"),
    updatedAt: format(subDays(new Date(), 30), "yyyy-MM-dd'T'HH:mm:ss"),
    lastRunAt: format(subDays(new Date(), 2), "yyyy-MM-dd'T'HH:mm:ss"),
    createdBy: "Admin User"
  },
  {
    id: "2",
    name: "Appointment Reminder",
    description: "Send reminder 24 hours before appointment",
    status: "active",
    trigger: "appointment_scheduled",
    conditions: [
      {
        id: "condition-1",
        field: "appointment.type",
        operator: "equals",
        value: "regular"
      }
    ],
    actions: [
      {
        id: "action-2",
        type: "send_sms",
        name: "Send SMS reminder",
        delayDays: 1,
        template: "appointment-reminder-sms"
      },
      {
        id: "action-3",
        type: "send_email",
        name: "Send email reminder",
        delayDays: 1,
        template: "appointment-reminder-email"
      }
    ],
    createdAt: format(subDays(new Date(), 45), "yyyy-MM-dd'T'HH:mm:ss"),
    updatedAt: format(subDays(new Date(), 20), "yyyy-MM-dd'T'HH:mm:ss"),
    lastRunAt: format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss"),
    createdBy: "Admin User"
  },
  {
    id: "3",
    name: "Missed Appointment Follow-up",
    description: "Create follow-up task when patient misses appointment",
    status: "active",
    trigger: "missed_appointment",
    conditions: [],
    actions: [
      {
        id: "action-4",
        type: "create_task",
        name: "Create follow-up task",
        assignee: "front_desk",
        priority: "medium"
      },
      {
        id: "action-5",
        type: "send_email",
        name: "Send missed appointment email",
        template: "missed-appointment-email"
      }
    ],
    createdAt: format(subDays(new Date(), 60), "yyyy-MM-dd'T'HH:mm:ss"),
    updatedAt: format(subDays(new Date(), 60), "yyyy-MM-dd'T'HH:mm:ss"),
    lastRunAt: format(subDays(new Date(), 3), "yyyy-MM-dd'T'HH:mm:ss"),
    createdBy: "Admin User"
  },
  {
    id: "4",
    name: "Lab Results Notification",
    description: "Notify patient when lab results are received",
    status: "inactive",
    trigger: "lab_results_received",
    conditions: [
      {
        id: "condition-2",
        field: "lab_results.status",
        operator: "equals",
        value: "normal"
      }
    ],
    actions: [
      {
        id: "action-6",
        type: "send_email",
        name: "Send lab results email",
        template: "lab-results-email"
      }
    ],
    createdAt: format(subDays(new Date(), 75), "yyyy-MM-dd'T'HH:mm:ss"),
    updatedAt: format(subDays(new Date(), 10), "yyyy-MM-dd'T'HH:mm:ss"),
    createdBy: "Admin User"
  },
  {
    id: "5",
    name: "Patient Birthday Greeting",
    description: "Send birthday email to patients",
    status: "draft",
    trigger: "manual",
    conditions: [],
    actions: [
      {
        id: "action-7",
        type: "send_email",
        name: "Send birthday email",
        template: "birthday-email"
      }
    ],
    createdAt: format(subDays(new Date(), 5), "yyyy-MM-dd'T'HH:mm:ss"),
    updatedAt: format(subDays(new Date(), 5), "yyyy-MM-dd'T'HH:mm:ss"),
    createdBy: "Marketing Manager"
  }
];

const mockExecutions: WorkflowExecution[] = [
  {
    id: "exec-1",
    workflowId: "1",
    patientId: "P12345",
    triggeredAt: format(subDays(new Date(), 2), "yyyy-MM-dd'T'10:30:00"),
    status: "completed",
    completedAt: format(subDays(new Date(), 2), "yyyy-MM-dd'T'10:31:00"),
    actions: [
      {
        actionId: "action-1",
        status: "completed",
        scheduledFor: format(subDays(new Date(), 2), "yyyy-MM-dd'T'10:30:00"),
        completedAt: format(subDays(new Date(), 2), "yyyy-MM-dd'T'10:31:00"),
        result: "Email sent successfully"
      }
    ]
  },
  {
    id: "exec-2",
    workflowId: "2",
    patientId: "P67890",
    appointmentId: "A12345",
    triggeredAt: format(subDays(new Date(), 1), "yyyy-MM-dd'T'09:15:00"),
    status: "completed",
    completedAt: format(subDays(new Date(), 1), "yyyy-MM-dd'T'09:16:30"),
    actions: [
      {
        actionId: "action-2",
        status: "completed",
        scheduledFor: format(subDays(new Date(), 1), "yyyy-MM-dd'T'09:15:00"),
        completedAt: format(subDays(new Date(), 1), "yyyy-MM-dd'T'09:15:45"),
        result: "SMS sent successfully"
      },
      {
        actionId: "action-3",
        status: "completed",
        scheduledFor: format(subDays(new Date(), 1), "yyyy-MM-dd'T'09:15:00"),
        completedAt: format(subDays(new Date(), 1), "yyyy-MM-dd'T'09:16:30"),
        result: "Email sent successfully"
      }
    ]
  },
  {
    id: "exec-3",
    workflowId: "3",
    patientId: "P54321",
    appointmentId: "A54321",
    triggeredAt: format(subDays(new Date(), 3), "yyyy-MM-dd'T'14:00:00"),
    status: "failed",
    actions: [
      {
        actionId: "action-4",
        status: "completed",
        scheduledFor: format(subDays(new Date(), 3), "yyyy-MM-dd'T'14:00:00"),
        completedAt: format(subDays(new Date(), 3), "yyyy-MM-dd'T'14:01:00"),
        result: "Task created successfully"
      },
      {
        actionId: "action-5",
        status: "failed",
        scheduledFor: format(subDays(new Date(), 3), "yyyy-MM-dd'T'14:00:00"),
        error: "Email sending failed: Invalid recipient email address"
      }
    ]
  },
  {
    id: "exec-4",
    workflowId: "1",
    patientId: "P13579",
    triggeredAt: format(new Date(), "yyyy-MM-dd'T'08:30:00"),
    status: "in_progress",
    actions: [
      {
        actionId: "action-1",
        status: "pending",
        scheduledFor: format(addDays(new Date(), 1), "yyyy-MM-dd'T'08:30:00")
      }
    ]
  }
];

const Workflows: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [executions, setExecutions] = useState<WorkflowExecution[]>(mockExecutions);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreateWorkflow = () => {
    // This would navigate to workflow editor page in a real app
    toast({
      title: "Coming Soon",
      description: "Workflow editor is currently under development.",
    });
  };

  const handleEditWorkflow = (workflowId: string) => {
    // This would navigate to workflow editor page in a real app
    toast({
      title: "Coming Soon",
      description: "Workflow editor is currently under development.",
    });
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflowToDelete(workflowId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteWorkflow = () => {
    if (workflowToDelete) {
      setWorkflows(prevWorkflows => prevWorkflows.filter(w => w.id !== workflowToDelete));
      setExecutions(prevExecutions => prevExecutions.filter(e => e.workflowId !== workflowToDelete));
      
      toast({
        title: "Workflow deleted",
        description: "The workflow has been deleted successfully.",
      });
      
      setIsDeleteDialogOpen(false);
      setWorkflowToDelete(null);
    }
  };

  const handleDuplicateWorkflow = (workflowId: string) => {
    const workflowToDuplicate = workflows.find(w => w.id === workflowId);
    
    if (workflowToDuplicate) {
      const newWorkflow: Workflow = {
        ...workflowToDuplicate,
        id: `workflow-${Date.now()}`,
        name: `${workflowToDuplicate.name} (Copy)`,
        status: "draft",
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        lastRunAt: undefined
      };
      
      setWorkflows(prevWorkflows => [...prevWorkflows, newWorkflow]);
      
      toast({
        title: "Workflow duplicated",
        description: "A copy of the workflow has been created.",
      });
    }
  };

  const handleToggleWorkflowStatus = (workflowId: string, newStatus: WorkflowStatus) => {
    setWorkflows(prevWorkflows => 
      prevWorkflows.map(workflow => 
        workflow.id === workflowId 
          ? { 
              ...workflow, 
              status: newStatus, 
              updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss") 
            } 
          : workflow
      )
    );
    
    toast({
      title: `Workflow ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
      description: `The workflow has been ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`,
    });
  };

  // Calculate workflow statistics
  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter(w => w.status === "active").length;
  const inactiveWorkflows = workflows.filter(w => w.status === "inactive").length;
  const draftWorkflows = workflows.filter(w => w.status === "draft").length;
  
  const totalExecutions = executions.length;
  const completedExecutions = executions.filter(e => e.status === "completed").length;
  const failedExecutions = executions.filter(e => e.status === "failed").length;
  const inProgressExecutions = executions.filter(e => e.status === "in_progress" || e.status === "pending").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">
            Automate patient communication and internal processes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{activeWorkflows}</span>
                <Activity className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Runs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{completedExecutions}</span>
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Failed Runs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{failedExecutions}</span>
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{inProgressExecutions}</span>
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Workflows ({totalWorkflows})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeWorkflows})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({inactiveWorkflows})</TabsTrigger>
            <TabsTrigger value="draft">Draft ({draftWorkflows})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <WorkflowList 
              workflows={workflows} 
              onCreateWorkflow={handleCreateWorkflow} 
              onEditWorkflow={handleEditWorkflow}
              onDeleteWorkflow={handleDeleteWorkflow}
              onDuplicateWorkflow={handleDuplicateWorkflow}
              onToggleWorkflowStatus={handleToggleWorkflowStatus}
            />
          </TabsContent>

          <TabsContent value="active">
            <WorkflowList 
              workflows={workflows.filter(w => w.status === "active")} 
              onCreateWorkflow={handleCreateWorkflow} 
              onEditWorkflow={handleEditWorkflow}
              onDeleteWorkflow={handleDeleteWorkflow}
              onDuplicateWorkflow={handleDuplicateWorkflow}
              onToggleWorkflowStatus={handleToggleWorkflowStatus}
            />
          </TabsContent>

          <TabsContent value="inactive">
            <WorkflowList 
              workflows={workflows.filter(w => w.status === "inactive")} 
              onCreateWorkflow={handleCreateWorkflow} 
              onEditWorkflow={handleEditWorkflow}
              onDeleteWorkflow={handleDeleteWorkflow}
              onDuplicateWorkflow={handleDuplicateWorkflow}
              onToggleWorkflowStatus={handleToggleWorkflowStatus}
            />
          </TabsContent>

          <TabsContent value="draft">
            <WorkflowList 
              workflows={workflows.filter(w => w.status === "draft")} 
              onCreateWorkflow={handleCreateWorkflow} 
              onEditWorkflow={handleEditWorkflow}
              onDeleteWorkflow={handleDeleteWorkflow}
              onDuplicateWorkflow={handleDuplicateWorkflow}
              onToggleWorkflowStatus={handleToggleWorkflowStatus}
            />
          </TabsContent>
        </Tabs>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this workflow? This action cannot be undone 
                and will also remove all associated execution history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteWorkflow} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Workflows;
