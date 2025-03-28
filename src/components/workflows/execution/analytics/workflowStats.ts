
import { WorkflowExecution } from "../../types/executionHistory";

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
