
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Website", value: 40 },
  { name: "Referral", value: 30 },
  { name: "Social Media", value: 15 },
  { name: "Email", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const LeadSourceReport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Sources</CardTitle>
        <CardDescription>Distribution of lead acquisition channels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadSourceReport;
