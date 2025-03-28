
export type WorkflowStatus = "active" | "paused" | "draft" | "error";
export type WorkflowTrigger = 
  | "manual" 
  | "new_patient" 
  | "appointment_scheduled" 
  | "appointment_completed" 
  | "form_submission" 
  | "scheduled";

export type WorkflowStepType = 
  | "email" 
  | "sms" 
  | "task" 
  | "wait" 
  | "condition" 
  | "template";

export interface WorkflowStepConfig {
  [key: string]: any;
  subject?: string;
  content?: string;
  recipient?: string;
  delay?: string;
  condition?: string;
  assignee?: string;
  message?: string;
  description?: string;
  templateId?: string;
}

export interface WorkflowStep {
  type: WorkflowStepType;
  config: WorkflowStepConfig;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
  lastRun?: string;
  createdBy: string;
}
