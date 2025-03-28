
import { WorkflowExecution } from "../types/executionHistory";

// Generate a random execution path for sample data
export const generateRandomPath = (stepCount: number): string[] => {
  const stepTypes = ["email", "sms", "task", "wait", "condition", "branch"];
  const path: string[] = [];
  
  for (let i = 0; i < stepCount; i++) {
    const stepType = stepTypes[Math.floor(Math.random() * stepTypes.length)];
    path.push(`Step ${i + 1}: ${stepType}`);
  }
  
  return path;
};

// Generate sample history data for demonstration
export const generateSampleHistory = (): WorkflowExecution[] => {
  const workflowNames = [
    "New Patient Welcome",
    "Appointment Reminder",
    "Follow-up Survey",
    "Prescription Renewal"
  ];
  
  const errorMessages = [
    "Workflow completed successfully",
    "Email sent to patient",
    "Task created for staff",
    "SMS notification sent",
    "Waiting period completed",
    "Condition evaluated to true",
    "Failed to send email: invalid address",
    "Execution timed out after 10 minutes",
    "Workflow paused by user"
  ];
  
  const categories = ["Email", "Task", "Notification", "Integration"];
  
  const history: WorkflowExecution[] = [];
  
  for (let i = 0; i < 30; i++) {
    const success = Math.random() > 0.3; // 70% success rate
    const workflowName = workflowNames[Math.floor(Math.random() * workflowNames.length)];
    const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const stepCount = Math.floor(Math.random() * 10) + 1;
    const branchesUsed = Math.floor(Math.random() * 3); // 0-2 branches used
    
    // Generate a timestamp within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    history.push({
      id: `sample-${i}`,
      workflowId: `workflow-${i % 4 + 1}`,
      workflowName,
      timestamp: date.toISOString(),
      success,
      errorMessage,
      message: errorMessage, // For backward compatibility
      duration: Math.floor(Math.random() * 10000), // Random duration between 0-10000ms
      stepCount,
      category,
      branchesUsed,
      executionPath: generateRandomPath(stepCount)
    });
  }
  
  // Sort by timestamp (newest first)
  return history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
