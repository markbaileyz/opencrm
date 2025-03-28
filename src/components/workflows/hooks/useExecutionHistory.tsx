
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  timestamp: string;
  success: boolean;
  message: string;
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

  return {
    executionHistory,
    addExecutionRecord,
    clearHistory
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
  
  const history: WorkflowExecution[] = [];
  
  for (let i = 0; i < 15; i++) {
    const success = Math.random() > 0.3; // 70% success rate
    const workflowName = workflowNames[Math.floor(Math.random() * workflowNames.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // Generate a timestamp within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    history.push({
      id: `sample-${i}`,
      workflowId: `workflow-${i % 4 + 1}`,
      workflowName,
      timestamp: date.toISOString(),
      success,
      message
    });
  }
  
  // Sort by timestamp (newest first)
  return history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
