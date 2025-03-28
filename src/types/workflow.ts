
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
  | "template"
  | "branch"; // Added new branch type for conditional flows

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
  // New properties for branch conditions
  conditions?: BranchCondition[];
  defaultBranchId?: string;
}

// New type for branch conditions
export interface BranchCondition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value: string;
  nextStepId: string;
  description?: string;
}

// Condition operators for branch conditions
export type ConditionOperator = 
  | "equals" 
  | "not_equals" 
  | "contains" 
  | "not_contains" 
  | "greater_than" 
  | "less_than"
  | "is_empty"
  | "is_not_empty"
  | "starts_with"
  | "ends_with";

export interface WorkflowStep {
  id: string; // Adding ID to each step for branch references
  type: WorkflowStepType;
  config: WorkflowStepConfig;
  nextStepId?: string; // Optional next step ID for linear workflows
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
  version?: number; // For versioning support
}
