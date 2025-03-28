
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { WorkflowExecution } from "../types/executionHistory";
import { generateSampleHistory } from "../execution/executionHistoryUtils";
import { calculateAnalyticsData } from "../execution/analytics/analyticsUtils";

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
      executionPath: execution.executionPath || []
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
    return calculateAnalyticsData(executionHistory);
  }, [executionHistory]);

  return {
    executionHistory,
    addExecutionRecord,
    clearHistory,
    getAnalyticsData
  };
};

// Re-export the types for easier imports
export type { WorkflowExecution } from "../types/executionHistory";
export type { AnalyticsData } from "../types/executionHistory";
