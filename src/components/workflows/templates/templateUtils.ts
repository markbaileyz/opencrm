
import { Workflow, WorkflowStep, WorkflowTrigger } from "@/types/workflow";
import { v4 as uuidv4 } from "uuid";

// Template step interface with additional fields for the preview
interface TemplateStep {
  type: string;
  title: string;
  description: string;
  config?: any;
  branches?: {
    condition: string;
    nextStep: string;
  }[];
}

// Template interface for the preview
interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: TemplateStep[];
  trigger: WorkflowTrigger;
}

// Healthcare branch patterns
export const healthcareBranchPatterns = {
  testResults: {
    field: "test_results.value",
    branches: [
      { condition: "test_results.value > normal_range.max", nextStep: "Abnormal High" },
      { condition: "test_results.value < normal_range.min", nextStep: "Abnormal Low" },
      { condition: "test_results.value >= normal_range.min && test_results.value <= normal_range.max", nextStep: "Normal" }
    ]
  },
  insuranceVerification: {
    field: "insurance.status",
    branches: [
      { condition: "insurance.status == 'verified'", nextStep: "Proceed with Appointment" },
      { condition: "insurance.status == 'expired'", nextStep: "Request Updated Insurance" },
      { condition: "insurance.status == 'pending'", nextStep: "Contact Insurance Provider" },
      { condition: "insurance.status == 'denied'", nextStep: "Discuss Payment Options" }
    ]
  },
  patientHistory: {
    field: "patient.history",
    branches: [
      { condition: "patient.history.includes('diabetes')", nextStep: "Diabetes Protocol" },
      { condition: "patient.history.includes('hypertension')", nextStep: "Hypertension Check" },
      { condition: "patient.history.includes('heart_disease')", nextStep: "Cardiac Evaluation" },
      { condition: "patient.history.includes('allergies')", nextStep: "Allergy Verification" }
    ]
  },
  appointmentType: {
    field: "appointment.type",
    branches: [
      { condition: "appointment.type == 'new_patient'", nextStep: "New Patient Intake" },
      { condition: "appointment.type == 'follow_up'", nextStep: "Treatment Follow-up" },
      { condition: "appointment.type == 'annual'", nextStep: "Annual Physical" },
      { condition: "appointment.type == 'specialist'", nextStep: "Specialist Consultation" }
    ]
  }
};

// Template definitions
const templates: Template[] = [
  {
    id: "new-patient-onboarding",
    name: "New Patient Onboarding",
    description: "Guide new patients through registration, insurance verification, and initial assessment.",
    category: "patient-care",
    trigger: "new_patient",
    steps: [
      {
        type: "email",
        title: "Welcome Email",
        description: "Send a welcome email to the patient with intake forms and instructions."
      },
      {
        type: "branch",
        title: "Insurance Verification",
        description: "Check the patient's insurance status and route accordingly.",
        branches: [
          { condition: "insurance.status == 'verified'", nextStep: "Send Appointment Reminder" },
          { condition: "insurance.status == 'expired'", nextStep: "Request Updated Insurance" },
          { condition: "insurance.status == 'pending'", nextStep: "Contact Insurance Provider" }
        ]
      },
      {
        type: "sms",
        title: "Appointment Reminder",
        description: "Send a text reminder 24 hours before the appointment."
      },
      {
        type: "task",
        title: "Prepare Patient Chart",
        description: "Create and prepare patient chart for the initial visit."
      },
      {
        type: "wait",
        title: "Wait for Appointment",
        description: "Wait until the appointment date."
      }
    ]
  },
  {
    id: "lab-results-notification",
    name: "Lab Results Notification",
    description: "Notify patients of lab results with appropriate follow-up actions.",
    category: "clinical",
    trigger: "form_submission",
    steps: [
      {
        type: "task",
        title: "Review Lab Results",
        description: "Provider reviews lab results before notification."
      },
      {
        type: "branch",
        title: "Evaluate Test Results",
        description: "Route based on the lab test results.",
        branches: [
          { condition: "test_results.value > normal_range.max", nextStep: "Abnormal High Result" },
          { condition: "test_results.value < normal_range.min", nextStep: "Abnormal Low Result" },
          { condition: "test_results.value >= normal_range.min && test_results.value <= normal_range.max", nextStep: "Normal Result" }
        ]
      },
      {
        type: "email",
        title: "Normal Result Notification",
        description: "Send normal lab results notification to patient."
      },
      {
        type: "task",
        title: "Abnormal Result Follow-up",
        description: "Schedule follow-up call for abnormal results."
      },
      {
        type: "sms",
        title: "Result Available Notification",
        description: "Notify patient that results are available in the portal."
      },
      {
        type: "wait",
        title: "Wait for Response",
        description: "Wait for patient to acknowledge results."
      }
    ]
  },
  {
    id: "insurance-verification",
    name: "Insurance Verification",
    description: "Verify patient insurance eligibility and benefits before appointments.",
    category: "admin",
    trigger: "appointment_scheduled",
    steps: [
      {
        type: "task",
        title: "Check Insurance Status",
        description: "Verify insurance eligibility and coverage details."
      },
      {
        type: "branch",
        title: "Insurance Status Evaluation",
        description: "Route based on insurance verification status.",
        branches: [
          { condition: "insurance.status == 'verified'", nextStep: "Send Verification Confirmation" },
          { condition: "insurance.status == 'expired'", nextStep: "Request Updated Information" },
          { condition: "insurance.status == 'pending'", nextStep: "Contact Insurance Provider" },
          { condition: "insurance.status == 'denied'", nextStep: "Contact Patient for Payment" }
        ]
      },
      {
        type: "email",
        title: "Insurance Verification Confirmation",
        description: "Send confirmation of verified insurance to patient."
      },
      {
        type: "task",
        title: "Update Patient Records",
        description: "Update patient records with current insurance information."
      }
    ]
  },
  {
    id: "vital-signs-monitoring",
    name: "Vital Signs Monitoring",
    description: "Monitor patient vital signs and alert on concerning values.",
    category: "clinical",
    trigger: "form_submission",
    steps: [
      {
        type: "task",
        title: "Record Vital Signs",
        description: "Log patient's vital signs from submission."
      },
      {
        type: "branch",
        title: "Evaluate Blood Pressure",
        description: "Check blood pressure readings and route accordingly.",
        branches: [
          { condition: "vitals.systolic > 140 || vitals.diastolic > 90", nextStep: "High BP Alert" },
          { condition: "vitals.systolic < 90 || vitals.diastolic < 60", nextStep: "Low BP Alert" },
          { condition: "(vitals.systolic >= 90 && vitals.systolic <= 140) && (vitals.diastolic >= 60 && vitals.diastolic <= 90)", nextStep: "Normal BP" }
        ]
      },
      {
        type: "branch",
        title: "Evaluate Heart Rate",
        description: "Check heart rate readings and route accordingly.",
        branches: [
          { condition: "vitals.heart_rate > 100", nextStep: "High HR Alert" },
          { condition: "vitals.heart_rate < 60", nextStep: "Low HR Alert" },
          { condition: "vitals.heart_rate >= 60 && vitals.heart_rate <= 100", nextStep: "Normal HR" }
        ]
      },
      {
        type: "task",
        title: "Normal Values Follow-up",
        description: "Record normal values in patient chart."
      },
      {
        type: "task",
        title: "Abnormal Values Alert",
        description: "Generate clinical alert for abnormal values."
      }
    ]
  }
];

// Get template by ID
export const getTemplateById = (id: string): Template | null => {
  return templates.find(template => template.id === id) || null;
};

// Convert template to workflow
export const templateToWorkflow = (templateId: string): Partial<Workflow> => {
  const template = getTemplateById(templateId);
  if (!template) return {};
  
  // Create workflow steps from template steps
  const workflowSteps: WorkflowStep[] = template.steps.map(step => {
    // Generate step config based on the step type
    let config = {};
    
    switch (step.type) {
      case "email":
        config = {
          subject: `${template.name} - ${step.title}`,
          content: step.description,
          recipient: "{{patient.email}}"
        };
        break;
      case "sms":
        config = {
          message: step.description,
          recipient: "{{patient.phone}}"
        };
        break;
      case "task":
        config = {
          subject: step.title,
          description: step.description,
          assignee: "{{current_user}}"
        };
        break;
      case "wait":
        config = {
          delay: "24h" // Default to 24 hours
        };
        break;
      case "branch":
        if (step.branches) {
          const conditions = step.branches.map(branch => ({
            id: uuidv4(),
            field: branch.condition.split(' ')[0], // Extract field from condition
            operator: branch.condition.split(' ')[1] as any, // Extract operator
            value: branch.condition.split(' ')[2], // Extract value
            nextStepId: branch.nextStep,
            description: `Go to ${branch.nextStep} if ${branch.condition}`
          }));
          
          config = {
            conditions,
            defaultBranchId: "end" // Default branch
          };
        }
        break;
    }
    
    return {
      id: uuidv4(),
      type: step.type as any,
      config
    };
  });
  
  // Create workflow from template
  return {
    name: template.name,
    description: template.description,
    trigger: template.trigger,
    status: "draft",
    steps: workflowSteps
  };
};
