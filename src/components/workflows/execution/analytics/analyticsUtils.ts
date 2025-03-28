
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
