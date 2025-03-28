
import { WorkflowExecution } from "../../types/executionHistory";

// Get top workflows by execution count
export const getTopWorkflows = (executionHistory: WorkflowExecution[]) => {
  // Group executions by workflow
  const workflowGroups = executionHistory.reduce((groups, execution) => {
    const workflowId = execution.workflowId;
    if (!groups[workflowId]) {
      groups[workflowId] = {
        workflowId,
        name: execution.workflowName,
        executions: [],
        category: execution.category || "Uncategorized"
      };
    }
    groups[workflowId].executions.push(execution);
    return groups;
  }, {} as Record<string, { workflowId: string; name: string; executions: WorkflowExecution[]; category: string }>);

  // Convert to array and calculate metrics
  const workflowStats = Object.values(workflowGroups).map(workflow => {
    const totalExecutions = workflow.executions.length;
    const successfulExecutions = workflow.executions.filter(e => e.success).length;
    
    return {
      workflowId: workflow.workflowId,
      name: workflow.name,
      category: workflow.category,
      count: totalExecutions,
      successCount: successfulExecutions,
      successRate: Math.round((successfulExecutions / totalExecutions) * 100),
      avgTime: workflow.executions.reduce((sum, e) => sum + (e.duration || 0), 0) / totalExecutions / 1000, // in seconds
    };
  });

  // Sort by execution count (descending)
  return workflowStats.sort((a, b) => b.count - a.count);
};
