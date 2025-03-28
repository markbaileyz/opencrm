
export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  timestamp: string;
  success: boolean;
  message: string;
  duration?: number; // Execution duration in milliseconds
  stepCount?: number; // Number of steps executed
  category?: string; // Workflow category
  branchesUsed?: number; // Number of branches used in the execution
  executionPath?: string[]; // Path of steps that were executed
}

export interface AnalyticsData {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  successRate: number;
  averageDuration: number;
  categoryCounts: Record<string, number>;
  executionsPerDay: { date: string; count: number }[];
  topWorkflows: {
    name: string;
    count: number;
    successCount: number;
    branchCount: number;
    avgBranchesPerExecution: number;
    successRate: number;
  }[];
  branchUsageStats: {
    totalBranchesUsed: number;
    averageBranchesPerWorkflow: number;
    workflowsWithBranches: number;
    percentageWithBranches: number;
  };
}
