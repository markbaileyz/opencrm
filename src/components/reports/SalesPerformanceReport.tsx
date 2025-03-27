
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", sales: 4000, target: 2400 },
  { month: "Feb", sales: 3000, target: 2400 },
  { month: "Mar", sales: 2000, target: 2400 },
  { month: "Apr", sales: 2780, target: 2400 },
  { month: "May", sales: 1890, target: 2400 },
  { month: "Jun", sales: 2390, target: 2400 },
  { month: "Jul", sales: 3490, target: 2400 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-sm">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`Sales: $${payload[0].value?.toLocaleString()}`}</p>
        <p className="text-green-500">{`Target: $${payload[1].value?.toLocaleString()}`}</p>
        {payload[0].value && payload[1].value && (
          <p className={`text-xs mt-1 ${Number(payload[0].value) >= Number(payload[1].value) ? "text-green-500" : "text-red-500"}`}>
            {Number(payload[0].value) >= Number(payload[1].value) 
              ? `${Math.round((Number(payload[0].value) / Number(payload[1].value) - 1) * 100)}% above target` 
              : `${Math.round((1 - Number(payload[0].value) / Number(payload[1].value)) * 100)}% below target`}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const SalesPerformanceReport = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Monthly sales vs target comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#82ca9d" name="Target" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPerformanceReport;
