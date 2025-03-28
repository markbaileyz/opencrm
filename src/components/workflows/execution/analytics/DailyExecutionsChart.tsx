
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { format, parseISO } from "date-fns";

interface ExecutionDataPoint {
  date: string;
  count: number;
}

interface DailyExecutionsChartProps {
  executionsPerDay: ExecutionDataPoint[];
}

const DailyExecutionsChart: React.FC<DailyExecutionsChartProps> = ({ executionsPerDay }) => {
  // Function to format dates for display
  const formatDate = (dateStr: string) => {
    try {
      // Ensure dateStr is in ISO format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        return dateStr; // Return as is if not ISO format
      }
      const date = parseISO(dateStr);
      return format(date, "MMM d");
    } catch (err) {
      console.error("Error formatting date:", dateStr, err);
      return dateStr;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Executions</CardTitle>
        <CardDescription>Number of workflow executions per day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={executionsPerDay}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                tickFormatter={(value) => formatDate(value)}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => `Date: ${formatDate(value)}`}
                formatter={(value) => [`${value} executions`, 'Count']}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyExecutionsChart;
