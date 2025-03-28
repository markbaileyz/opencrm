
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
  const topWorkflows = getTopWorkflows(executionHistory);

  return {
    ...executionStats,
    categoryCounts,
    executionsPerDay,
    topWorkflows,
    branchUsageStats
  };
};

// Re-export analytics functions from the individual files
export * from './categoryStats';
export * from './timelineStats';
export * from './branchStats';
export * from './executionStats';
export * from './workflowStats';
