
import { WorkflowExecution } from "../../types/executionHistory";

// Calculate overall execution statistics
export const calculateExecutionStats = (executionHistory: WorkflowExecution[]) => {
  const totalExecutions = executionHistory.length;
  if (totalExecutions === 0) {
    return {
      successRate: 0,
      successRateTrend: 0,
      failureRate: 0,
      totalExecutions: 0,
      executionsTrend: 0,
      avgExecutionTime: 0,
      executionTimeTrend: 0
    };
  }

  const successfulExecutions = executionHistory.filter(e => e.success).length;
  const successRate = Math.round((successfulExecutions / totalExecutions) * 100);
  const failureRate = 100 - successRate;
  
  const avgExecutionTime = executionHistory.reduce((sum, e) => sum + (e.duration || 0), 0) / totalExecutions / 1000; // in seconds

  // For trends, in a real app we would compare with previous period
  // Here we'll just generate some mock trend data
  const successRateTrend = Math.floor(Math.random() * 10) - 5; // Between -5 and 5
  const executionsTrend = Math.floor(Math.random() * 20); // Between 0 and 20
  const executionTimeTrend = Math.floor(Math.random() * 10) - 5; // Between -5 and 5

  return {
    successRate,
    successRateTrend,
    failureRate,
    totalExecutions,
    executionsTrend,
    avgExecutionTime: parseFloat(avgExecutionTime.toFixed(2)),
    executionTimeTrend
  };
};
