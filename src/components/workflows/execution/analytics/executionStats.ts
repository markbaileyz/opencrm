
import { WorkflowExecution } from "../../types/executionHistory";

// Calculate success and duration statistics from execution history
export const calculateExecutionStats = (executionHistory: WorkflowExecution[]) => {
  // Calculate success rate
  const totalExecutions = executionHistory.length;
  const successfulExecutions = executionHistory.filter(exec => exec.success).length;
  const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;

  // Calculate average duration
  const executionsWithDuration = executionHistory.filter(exec => exec.duration);
  const averageDuration = executionsWithDuration.length > 0 
    ? executionsWithDuration.reduce((sum, exec) => sum + (exec.duration || 0), 0) / executionsWithDuration.length 
    : 0;

  return {
    totalExecutions,
    successfulExecutions,
    failedExecutions: totalExecutions - successfulExecutions,
    successRate,
    averageDuration
  };
};
