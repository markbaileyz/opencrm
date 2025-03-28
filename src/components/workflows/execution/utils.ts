
import { Workflow, WorkflowStep } from "@/types/workflow";

/**
 * Calculate the progress percentage of a workflow based on completed steps
 */
export const calculateProgress = (workflow: Workflow): number => {
  if (workflow.steps.length === 0) return 0;
  
  // For this mock implementation, we'll generate a random progress
  // In a real implementation, this would track actual step completion
  const completedSteps = Math.floor(Math.random() * (workflow.steps.length + 1));
  return Math.round((completedSteps / workflow.steps.length) * 100);
};

/**
 * Generate a human-readable status message for a workflow execution
 */
export const getExecutionStatusMessage = (workflow: Workflow): string => {
  const progress = calculateProgress(workflow);
  
  if (progress === 0) return "Waiting to start";
  if (progress === 100) return "Execution completed";
  
  // Determine which step is currently running
  const currentStepIndex = Math.floor((workflow.steps.length * progress) / 100);
  const currentStep = workflow.steps[currentStepIndex];
  
  return getStepExecutionMessage(currentStep, currentStepIndex);
};

/**
 * Get a message describing the current step execution
 */
const getStepExecutionMessage = (step: WorkflowStep, index: number): string => {
  const stepNumber = index + 1;
  
  switch (step.type) {
    case "email":
      return `Step ${stepNumber}: Sending email "${step.config.subject}"`;
    case "sms":
      return `Step ${stepNumber}: Sending SMS message`;
    case "task":
      return `Step ${stepNumber}: Creating task "${step.config.subject}"`;
    case "wait":
      return `Step ${stepNumber}: Waiting for ${step.config.delay} hours`;
    case "condition":
      return `Step ${stepNumber}: Evaluating condition`;
    case "template":
      return `Step ${stepNumber}: Applying template`;
    default:
      return `Step ${stepNumber}: Executing`;
  }
};

/**
 * Estimate the remaining time for a workflow execution
 */
export const estimateRemainingTime = (workflow: Workflow): string => {
  const progress = calculateProgress(workflow);
  if (progress >= 100) return "Completed";
  if (progress === 0) return "Not started";
  
  // For this mock implementation, we'll return a random time estimate
  // In a real implementation, this would be based on actual metrics
  const minutesRemaining = Math.floor(Math.random() * 60) + 1;
  
  if (minutesRemaining < 2) return "Less than a minute remaining";
  return `About ${minutesRemaining} minutes remaining`;
};
