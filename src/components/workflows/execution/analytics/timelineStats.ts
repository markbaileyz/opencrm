
import { WorkflowExecution } from "../../types/executionHistory";
import { addDays, subDays, format, parseISO, startOfDay } from "date-fns";

// Calculate daily execution counts
export const calculateDailyExecutions = (executionHistory: WorkflowExecution[]) => {
  // Create an array of the last 7 days
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    return format(date, "yyyy-MM-dd"); // Use ISO format (YYYY-MM-DD)
  });

  // Initialize counts with 0 for each day
  const dailyCounts = last7Days.reduce((acc, date) => {
    acc[date] = 0;
    return acc;
  }, {} as Record<string, number>);

  // Count executions per day
  executionHistory.forEach(execution => {
    try {
      const executionDate = format(parseISO(execution.timestamp), "yyyy-MM-dd");
      if (dailyCounts[executionDate] !== undefined) {
        dailyCounts[executionDate]++;
      }
    } catch (err) {
      console.error("Error processing execution date:", execution.timestamp, err);
    }
  });

  // Format for chart display
  const executionsPerDay = Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count
  }));

  return { executionsPerDay };
};
