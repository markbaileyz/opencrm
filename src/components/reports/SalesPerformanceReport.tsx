
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="target" fill="#82ca9d" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPerformanceReport;
