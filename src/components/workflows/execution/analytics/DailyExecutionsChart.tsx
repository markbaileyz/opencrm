
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
  // Validate and ensure each date string is in a proper format for parsing
  const validatedData = executionsPerDay.map(item => {
    // Ensure date is a valid string that can be parsed
    let formattedDate = item.date;
    
    // Check if the date is already in ISO format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}/.test(item.date)) {
      // If it's not in ISO format, it might be a simple day name (Mon, Tue, etc.)
      // In this case, we'll use the current date for display purposes only
      const now = new Date();
      formattedDate = now.toISOString().split('T')[0]; // Just use today's date as a placeholder
    }
    
    return {
      ...item,
      date: formattedDate
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Workflow Executions</CardTitle>
        <CardDescription>Number of workflow executions over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={validatedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => {
                  try {
                    // Safely parse the date string
                    const date = parseISO(value);
                    return format(date, 'MMM d');
                  } catch (err) {
                    console.error("Error formatting date:", value, err);
                    return value; // Fallback to the original value
                  }
                }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} executions`, 'Count']}
                labelFormatter={(value) => {
                  try {
                    // Safely parse the date string
                    const date = parseISO(value);
                    return format(date, 'MMMM d, yyyy');
                  } catch (err) {
                    console.error("Error formatting tooltip date:", value, err);
                    return value; // Fallback to the original value
                  }
                }}
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
