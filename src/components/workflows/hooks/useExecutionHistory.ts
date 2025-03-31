
import { useState, useCallback } from 'react';

export interface ExecutionRecord {
  id: string;
  workflowId: string;
  workflowName: string;
  timestamp: string;
  success: boolean;
  message: string;
  duration: number;
}

export const useExecutionHistory = () => {
  const [executionHistory, setExecutionHistory] = useState<ExecutionRecord[]>([]);
  
  const addExecutionRecord = useCallback((record: Omit<ExecutionRecord, 'id' | 'timestamp'>) => {
    const newRecord: ExecutionRecord = {
      ...record,
      id: `exec-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    
    setExecutionHistory(prev => [newRecord, ...prev]);
    return newRecord;
  }, []);
  
  const clearHistory = useCallback(() => {
    setExecutionHistory([]);
  }, []);
  
  return {
    executionHistory,
    addExecutionRecord,
    clearHistory
  };
};
