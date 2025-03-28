
import { WorkflowExecution, AnalyticsData } from "../types/executionHistory";

// Helper function to get top workflows by execution count
export const getTopWorkflows = (history: WorkflowExecution[]) => {
  const workflowCounts: Record<string, { count: number, successCount: number, branchCount: number }> = {};
  
  history.forEach(exec => {
    if (!workflowCounts[exec.workflowName]) {
      workflowCounts[exec.workflowName] = { count: 0, successCount: 0, branchCount: 0 };
    }
    workflowCounts[exec.workflowName].count += 1;
    if (exec.success) {
      workflowCounts[exec.workflowName].successCount += 1;
    }
    workflowCounts[exec.workflowName].branchCount += exec.branchesUsed || 0;
  });
  
  return Object.entries(workflowCounts)
    .map(([name, { count, successCount, branchCount }]) => ({
      name,
      count,
      successCount,
      branchCount,
      avgBranchesPerExecution: count > 0 ? branchCount / count : 0,
      successRate: count > 0 ? (successCount / count) * 100 : 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 workflows
};

// Calculate analytics data from execution history
export const calculateAnalyticsData = (executionHistory: WorkflowExecution[]): AnalyticsData => {
  // Calculate success rate
  const totalExecutions = executionHistory.length;
  const successfulExecutions = executionHistory.filter(exec => exec.success).length;
  const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;

  // Calculate average duration
  const executionsWithDuration = executionHistory.filter(exec => exec.duration);
  const averageDuration = executionsWithDuration.length > 0 
    ? executionsWithDuration.reduce((sum, exec) => sum + (exec.duration || 0), 0) / executionsWithDuration.length 
    : 0;

  // Get workflow categories count
  const categoryCounts: Record<string, number> = {};
  executionHistory.forEach(exec => {
    const category = exec.category || "Uncategorized";
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  // Calculate executions per day for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const executionsPerDay = last7Days.map(date => {
    const count = executionHistory.filter(exec => 
      exec.timestamp.split('T')[0] === date
    ).length;
    return { date, count };
  });

  // Calculate branch usage statistics
  const branchUsageStats = {
    totalBranchesUsed: executionHistory.reduce((sum, exec) => sum + (exec.branchesUsed || 0), 0),
    averageBranchesPerWorkflow: executionHistory.length > 0 
      ? executionHistory.reduce((sum, exec) => sum + (exec.branchesUsed || 0), 0) / executionHistory.length
      : 0,
    workflowsWithBranches: executionHistory.filter(exec => (exec.branchesUsed || 0) > 0).length,
    percentageWithBranches: executionHistory.length > 0
      ? (executionHistory.filter(exec => (exec.branchesUsed || 0) > 0).length / executionHistory.length) * 100
      : 0
  };

  return {
    totalExecutions,
    successfulExecutions,
    failedExecutions: totalExecutions - successfulExecutions,
    successRate,
    averageDuration,
    categoryCounts,
    executionsPerDay,
    topWorkflows: getTopWorkflows(executionHistory),
    branchUsageStats
  };
};
