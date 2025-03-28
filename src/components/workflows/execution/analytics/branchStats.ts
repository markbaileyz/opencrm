
import { WorkflowExecution } from "../../types/executionHistory";

// Calculate statistics related to branch usage
export const calculateBranchStats = (executionHistory: WorkflowExecution[]) => {
  // In a real app, this would analyze actual branch execution data
  // Since we're using mock data, we'll create some sample statistics
  
  // Count workflows that used branches
  const workflowsWithBranches = executionHistory.filter(e => e.branchesUsed && e.branchesUsed > 0);
  const totalBranches = workflowsWithBranches.reduce((sum, e) => sum + (e.branchesUsed || 0), 0);
  
  return {
    branchUsageStats: {
      totalBranches,
      avgBranchesPerWorkflow: workflowsWithBranches.length > 0 
        ? parseFloat((totalBranches / workflowsWithBranches.length).toFixed(1)) 
        : 0,
      mostUsedBranch: "Patient Condition Check" // Placeholder for mock data
    }
  };
};
