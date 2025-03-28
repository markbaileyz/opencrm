
import { WorkflowExecution } from "../../types/executionHistory";

// Calculate statistics by workflow category
export const calculateCategoryStats = (executionHistory: WorkflowExecution[]) => {
  // Group executions by category
  const categoryGroups = executionHistory.reduce((groups, execution) => {
    const category = execution.category || "Uncategorized";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(execution);
    return groups;
  }, {} as Record<string, WorkflowExecution[]>);

  // Calculate counts per category
  const categoryCounts: Record<string, number> = {};
  Object.entries(categoryGroups).forEach(([category, executions]) => {
    categoryCounts[category] = executions.length;
  });

  // Calculate success rates per category
  const categorySuccessRates: Record<string, number> = {};
  Object.entries(categoryGroups).forEach(([category, executions]) => {
    const successful = executions.filter(e => e.success).length;
    categorySuccessRates[category] = Math.round((successful / executions.length) * 100);
  });

  return {
    categoryCounts,
    categorySuccessRates
  };
};
