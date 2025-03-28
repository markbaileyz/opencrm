
import { WorkflowStep, WorkflowStepType } from "@/types/workflow";

// Helper function to get step title
export const getStepTitle = (step: WorkflowStep) => {
  switch (step.type) {
    case "email":
      return `Email: ${step.config.subject || "No subject"}`;
    case "sms":
      return `SMS: ${step.config.message?.substring(0, 20)}${step.config.message?.length > 20 ? "..." : ""}`;
    case "task":
      return `Task: ${step.config.subject || "No subject"}`;
    case "wait":
      return `Wait: ${step.config.delay} hours`;
    case "condition":
      return `Condition: ${step.config.condition?.substring(0, 20)}${step.config.condition?.length > 20 ? "..." : ""}`;
    case "template":
      return `Template: ${step.config.templateId}`;
    default:
      return "Unknown step";
  }
};

// Validation - check if step is valid based on step type
export const isStepValid = (stepType: WorkflowStepType, stepConfig: any) => {
  switch (stepType) {
    case "email":
      return stepConfig.subject.trim() !== "" && stepConfig.content.trim() !== "";
    case "sms":
      return stepConfig.message.trim() !== "";
    case "task":
      return stepConfig.subject.trim() !== "";
    case "wait":
      return stepConfig.delay !== "";
    case "condition":
      return stepConfig.condition.trim() !== "";
    case "template":
      return stepConfig.templateId !== "";
    default:
      return false;
  }
};

// Get relevant config based on step type
export const getRelevantConfig = (stepType: WorkflowStepType, stepConfig: any) => {
  switch (stepType) {
    case "email":
      return {
        subject: stepConfig.subject,
        content: stepConfig.content,
        recipient: stepConfig.recipient,
      };
    case "sms":
      return {
        message: stepConfig.message,
        recipient: stepConfig.recipient,
      };
    case "task":
      return {
        subject: stepConfig.subject,
        description: stepConfig.content,
        assignee: stepConfig.assignee,
      };
    case "wait":
      return {
        delay: stepConfig.delay,
      };
    case "condition":
      return {
        condition: stepConfig.condition,
      };
    case "template":
      return {
        templateId: stepConfig.templateId,
      };
    default:
      return {};
  }
};
