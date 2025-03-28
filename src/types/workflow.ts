
export type WorkflowStatus = "active" | "inactive" | "draft";
export type WorkflowTrigger = 
  | "patient_created" 
  | "appointment_scheduled" 
  | "appointment_completed" 
  | "missed_appointment"
  | "call_completed"
  | "medication_prescribed"
  | "lab_results_received"
  | "manual";

export type WorkflowActionType = 
  | "send_email" 
  | "send_sms" 
  | "create_task" 
  | "schedule_call" 
  | "patient_alert"
  | "update_patient_status";

export interface WorkflowAction {
  id: string;
  type: WorkflowActionType;
  name: string;
  description?: string;
  delayDays?: number; // days to wait before executing the action
  template?: string; // template ID for emails or SMS
  assignee?: string; // for tasks
  priority?: "low" | "medium" | "high"; // for tasks
}

export interface WorkflowCondition {
  id: string;
  field: string; // Which field to check (e.g., "patient.status", "appointment.type")
  operator: "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than";
  value: string | number | boolean;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  createdAt: string;
  updatedAt: string;
  lastRunAt?: string;
  createdBy: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  patientId?: string;
  appointmentId?: string;
  triggeredAt: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  completedAt?: string;
  actions: {
    actionId: string;
    status: "pending" | "completed" | "failed";
    scheduledFor: string;
    completedAt?: string;
    result?: string;
    error?: string;
  }[];
}
