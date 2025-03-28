
import { WorkflowExecution } from "../../types/executionHistory";

// Calculate executions per day for the last 7 days
export const calculateDailyExecutions = (executionHistory: WorkflowExecution[]) => {
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

  return { executionsPerDay };
};
