
import { Workflow, WorkflowStep } from "@/types/workflow";

// Calculate execution progress based on completed steps
export const calculateProgress = (workflow: Workflow): number => {
  if (!workflow.steps || workflow.steps.length === 0) return 0;
  
  // For demo purposes, generate a random progress value
  // In a real app, this would track actual execution progress
  const randomProgress = Math.floor(Math.random() * 100);
  return randomProgress;
};

// Evaluate a branch condition with sample data
export const evaluateCondition = (condition: string, data: any): boolean => {
  try {
    // Simple condition evaluator for demo purposes
    // In a real app, this would be more sophisticated
    const parts = condition.split(' ');
    if (parts.length !== 3) return false;
    
    const [field, operator, value] = parts;
    const fieldValue = field.split('.').reduce((obj, key) => obj?.[key], data);
    
    switch (operator) {
      case '==':
      case '===':
      case 'equals':
        return fieldValue == value;
      case '!=':
      case '!==':
      case 'not_equals':
        return fieldValue != value;
      case '>':
      case 'greater_than':
        return fieldValue > parseFloat(value);
      case '<':
      case 'less_than':
        return fieldValue < parseFloat(value);
      case 'contains':
        return String(fieldValue).includes(value);
      case 'not_contains':
        return !String(fieldValue).includes(value);
      case 'starts_with':
        return String(fieldValue).startsWith(value);
      case 'ends_with':
        return String(fieldValue).endsWith(value);
      case 'is_empty':
        return !fieldValue || fieldValue.length === 0;
      case 'is_not_empty':
        return !!fieldValue && fieldValue.length > 0;
      default:
        return false;
    }
  } catch (error) {
    console.error("Error evaluating condition:", error);
    return false;
  }
};

// Visualize workflow execution path (for analytics)
export const visualizeExecutionPath = (workflow: Workflow): string[] => {
  if (!workflow.steps || workflow.steps.length === 0) return [];
  
  // For demo purposes, return a simple execution path
  // In a real app, this would track the actual execution path
  return workflow.steps.map((step, index) => 
    `Step ${index + 1}: ${step.type}`
  );
};
