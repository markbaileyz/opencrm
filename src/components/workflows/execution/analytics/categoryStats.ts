
import { WorkflowExecution } from "../../types/executionHistory";

// Get workflow categories count
export const calculateCategoryStats = (executionHistory: WorkflowExecution[]) => {
  const categoryCounts: Record<string, number> = {};
  
  executionHistory.forEach(exec => {
    const category = exec.category || "Uncategorized";
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return { categoryCounts };
};
