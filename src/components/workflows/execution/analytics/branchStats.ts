
import { WorkflowExecution } from "../../types/executionHistory";

// Calculate branch usage statistics
export const calculateBranchStats = (executionHistory: WorkflowExecution[]) => {
  const totalBranchesUsed = executionHistory.reduce((sum, exec) => sum + (exec.branchesUsed || 0), 0);
  const averageBranchesPerWorkflow = executionHistory.length > 0 
    ? totalBranchesUsed / executionHistory.length
    : 0;
  const workflowsWithBranches = executionHistory.filter(exec => (exec.branchesUsed || 0) > 0).length;
  const percentageWithBranches = executionHistory.length > 0
    ? (workflowsWithBranches / executionHistory.length) * 100
    : 0;

  return {
    branchUsageStats: {
      totalBranchesUsed,
      averageBranchesPerWorkflow,
      workflowsWithBranches,
      percentageWithBranches
    }
  };
};
