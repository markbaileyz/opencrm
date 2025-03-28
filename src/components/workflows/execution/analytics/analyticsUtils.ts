
// Export the formatDuration function
export const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

import { WorkflowExecution, AnalyticsData } from "../../types/executionHistory";
import { getTopWorkflows } from "./workflowStats";
import { calculateExecutionStats } from "./executionStats";
import { calculateCategoryStats } from "./categoryStats";
import { calculateDailyExecutions } from "./timelineStats";
import { calculateBranchStats } from "./branchStats";

// Calculate analytics data from execution history
export const calculateAnalyticsData = (executionHistory: WorkflowExecution[]): AnalyticsData => {
  const executionStats = calculateExecutionStats(executionHistory);
  const { categoryCounts } = calculateCategoryStats(executionHistory);
  const { executionsPerDay } = calculateDailyExecutions(executionHistory);
  const { branchUsageStats } = calculateBranchStats(executionHistory);
  const topWorkflowsData = getTopWorkflows(executionHistory);
  
  // Transform the topWorkflows to match the expected format
  const topWorkflows = topWorkflowsData.map(workflow => ({
    name: workflow.name,
    count: workflow.count,
    successCount: workflow.successCount,
    successRate: workflow.successRate,
    // Add missing properties
    branchCount: executionHistory
      .filter(e => e.workflowName === workflow.name && e.branchesUsed)
      .reduce((sum, e) => sum + (e.branchesUsed || 0), 0),
    avgBranchesPerExecution: workflow.count > 0 
      ? executionHistory
          .filter(e => e.workflowName === workflow.name && e.branchesUsed)
          .reduce((sum, e) => sum + (e.branchesUsed || 0), 0) / workflow.count
      : 0
  }));

  return {
    ...executionStats,
    categoryCounts,
    executionsPerDay,
    topWorkflows,
    branchUsageStats: {
      totalBranches: branchUsageStats.totalBranchesUsed || 0,
      avgBranchesPerWorkflow: branchUsageStats.averageBranchesPerWorkflow || 0,
      mostUsedBranch: "Condition Branch" // Default value
    },
    // Add additional fields for compatibility
    failedExecutions: executionHistory.length - executionHistory.filter(e => e.success).length,
    successfulExecutions: executionHistory.filter(e => e.success).length,
    averageDuration: executionHistory.reduce((sum, e) => sum + (e.duration || 0), 0) / 
      (executionHistory.length || 1)
  };
};

// Re-export analytics functions from the individual files
export * from './categoryStats';
export * from './timelineStats';
export * from './branchStats';
export * from './executionStats';
export * from './workflowStats';
