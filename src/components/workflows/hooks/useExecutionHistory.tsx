
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

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

export const useExecutionHistory = () => {
  const [executionHistory, setExecutionHistory] = useState<WorkflowExecution[]>([]);
  const { toast } = useToast();

  // On initial load, fetch history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem("workflow-execution-history");
    if (storedHistory) {
      try {
        setExecutionHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse execution history", e);
      }
    } else {
      // Generate some sample history data for demonstration
      const sampleHistory = generateSampleHistory();
      setExecutionHistory(sampleHistory);
      localStorage.setItem("workflow-execution-history", JSON.stringify(sampleHistory));
    }
  }, []);

  // Add a new execution record to history
  const addExecutionRecord = useCallback((execution: Omit<WorkflowExecution, "id" | "timestamp">) => {
    const newRecord: WorkflowExecution = {
      ...execution,
      id: `exec-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      duration: execution.duration || Math.floor(Math.random() * 10000), // Random duration if not provided
      stepCount: execution.stepCount || Math.floor(Math.random() * 10) + 1, // Random step count if not provided
      category: execution.category || ["Email", "Task", "Notification", "Integration"][Math.floor(Math.random() * 4)], // Random category if not provided
      branchesUsed: execution.branchesUsed || Math.floor(Math.random() * 3), // Random branches used
      executionPath: execution.executionPath || generateRandomPath(execution.stepCount || 5)
    };
    
    setExecutionHistory(prev => {
      const updated = [newRecord, ...prev].slice(0, 100); // Keep only the most recent 100 records
      localStorage.setItem("workflow-execution-history", JSON.stringify(updated));
      return updated;
    });
    
    // Show notification based on execution success/failure
    toast({
      title: execution.success ? "Workflow Step Completed" : "Workflow Error",
      description: `${execution.workflowName}: ${execution.message}`,
      variant: execution.success ? "success" : "destructive",
    });
    
    return newRecord;
  }, [toast]);

  // Clear the execution history
  const clearHistory = useCallback(() => {
    setExecutionHistory([]);
    localStorage.removeItem("workflow-execution-history");
  }, []);

  // Get analytics data from execution history
  const getAnalyticsData = useCallback(() => {
    // Calculate success rate
    const totalExecutions = executionHistory.length;
    const successfulExecutions = executionHistory.filter(exec => exec.success).length;
    const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;

    // Calculate average duration
    const executionsWithDuration = executionHistory.filter(exec => exec.duration);
    const averageDuration = executionsWithDuration.length > 0 
      ? executionsWithDuration.reduce((sum, exec) => sum + (exec.duration || 0), 0) / executionsWithDuration.length 
      : 0;

    // Get workflow categories count
    const categoryCounts: Record<string, number> = {};
    executionHistory.forEach(exec => {
      const category = exec.category || "Uncategorized";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Calculate executions per day for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const executionsPerDay = last7Days.map(date => {
      const count = executionHistory.filter(exec => 
        exec.timestamp.split('T')[0] === date
      ).length;
      return { date, count };
    });

    // Calculate branch usage statistics
    const branchUsageStats = {
      totalBranchesUsed: executionHistory.reduce((sum, exec) => sum + (exec.branchesUsed || 0), 0),
      averageBranchesPerWorkflow: executionHistory.length > 0 
        ? executionHistory.reduce((sum, exec) => sum + (exec.branchesUsed || 0), 0) / executionHistory.length
        : 0,
      workflowsWithBranches: executionHistory.filter(exec => (exec.branchesUsed || 0) > 0).length,
      percentageWithBranches: executionHistory.length > 0
        ? (executionHistory.filter(exec => (exec.branchesUsed || 0) > 0).length / executionHistory.length) * 100
        : 0
    };

    return {
      totalExecutions,
      successfulExecutions,
      failedExecutions: totalExecutions - successfulExecutions,
      successRate,
      averageDuration,
      categoryCounts,
      executionsPerDay,
      topWorkflows: getTopWorkflows(executionHistory),
      branchUsageStats
    };
  }, [executionHistory]);

  // Helper function to get top workflows by execution count
  const getTopWorkflows = (history: WorkflowExecution[]) => {
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

  return {
    executionHistory,
    addExecutionRecord,
    clearHistory,
    getAnalyticsData
  };
};

// Generate sample history data for demonstration
const generateSampleHistory = (): WorkflowExecution[] => {
  const workflowNames = [
    "New Patient Welcome",
    "Appointment Reminder",
    "Follow-up Survey",
    "Prescription Renewal"
  ];
  
  const messages = [
    "Workflow completed successfully",
    "Email sent to patient",
    "Task created for staff",
    "SMS notification sent",
    "Waiting period completed",
    "Condition evaluated to true",
    "Failed to send email: invalid address",
    "Execution timed out after 10 minutes",
    "Workflow paused by user"
  ];
  
  const categories = ["Email", "Task", "Notification", "Integration"];
  
  const history: WorkflowExecution[] = [];
  
  for (let i = 0; i < 30; i++) {
    const success = Math.random() > 0.3; // 70% success rate
    const workflowName = workflowNames[Math.floor(Math.random() * workflowNames.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const stepCount = Math.floor(Math.random() * 10) + 1;
    const branchesUsed = Math.floor(Math.random() * 3); // 0-2 branches used
    
    // Generate a timestamp within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    history.push({
      id: `sample-${i}`,
      workflowId: `workflow-${i % 4 + 1}`,
      workflowName,
      timestamp: date.toISOString(),
      success,
      message,
      duration: Math.floor(Math.random() * 10000), // Random duration between 0-10000ms
      stepCount,
      category,
      branchesUsed,
      executionPath: generateRandomPath(stepCount)
    });
  }
  
  // Sort by timestamp (newest first)
  return history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate a random execution path for sample data
const generateRandomPath = (stepCount: number): string[] => {
  const stepTypes = ["email", "sms", "task", "wait", "condition", "branch"];
  const path: string[] = [];
  
  for (let i = 0; i < stepCount; i++) {
    const stepType = stepTypes[Math.floor(Math.random() * stepTypes.length)];
    path.push(`Step ${i + 1}: ${stepType}`);
  }
  
  return path;
};
