
export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  timestamp: string;
  duration: number; // in milliseconds
  success: boolean;
  stepCount?: number;
  category?: string;
  errorMessage?: string;
  triggeredBy?: string;
  completedSteps?: number;
  branchesUsed?: number;
  message?: string; // Added for compatibility
  executionPath?: string[]; // Added for execution path tracking
}

export interface AnalyticsData {
  successRate: number;
  successRateTrend: number;
  failureRate: number;
  totalExecutions: number;
  executionsTrend: number;
  avgExecutionTime: number;
  executionTimeTrend: number;
  categoryCounts: Record<string, number>;
  executionsPerDay: Array<{ date: string; count: number }>;
  topWorkflows: Array<{
    name: string;
    count: number;
    successCount: number;
    branchCount: number;
    avgBranchesPerExecution: number;
    successRate: number;
  }>;
  branchUsageStats: {
    totalBranches: number;
    avgBranchesPerWorkflow: number;
    mostUsedBranch: string;
  };
  // Added properties to match usage in code
  failedExecutions?: number;
  successfulExecutions?: number;
  averageDuration?: number;
  activeWorkflows?: number;
  activeWorkflowsTrend?: number;
}
