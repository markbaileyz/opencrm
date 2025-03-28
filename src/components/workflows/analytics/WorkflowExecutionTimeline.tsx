
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface TimelineDataPoint {
  date: string;
  executions: number;
  avgExecutionTime: number;
}

interface WorkflowExecutionTimelineProps {
  data: TimelineDataPoint[];
  isLoading: boolean;
}

const WorkflowExecutionTimeline: React.FC<WorkflowExecutionTimelineProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="executions"
            name="Executions"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgExecutionTime"
            name="Avg Execution Time (s)"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkflowExecutionTimeline;
