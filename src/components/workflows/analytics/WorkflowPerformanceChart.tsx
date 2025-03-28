
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PerformanceDataPoint {
  date: string;
  successCount: number;
  failureCount: number;
  successRate: number;
}

interface WorkflowPerformanceChartProps {
  data: PerformanceDataPoint[];
  isLoading: boolean;
}

const WorkflowPerformanceChart: React.FC<WorkflowPerformanceChartProps> = ({ data, isLoading }) => {
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
        <ComposedChart
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
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="successCount" name="Successful" fill="#10b981" />
          <Bar yAxisId="left" dataKey="failureCount" name="Failed" fill="#ef4444" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="successRate"
            name="Success Rate (%)"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkflowPerformanceChart;
