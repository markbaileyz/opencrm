
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface DailyExecutionsChartProps {
  executionsPerDay: { date: string; count: number }[];
}

const DailyExecutionsChart: React.FC<DailyExecutionsChartProps> = ({ executionsPerDay }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Workflow Executions</CardTitle>
        <CardDescription>Number of workflow executions over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={executionsPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => format(parseISO(value), 'MMM d')}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} executions`, 'Count']}
                labelFormatter={(value) => format(parseISO(value), 'MMMM d, yyyy')}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
                name="Executions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyExecutionsChart;
