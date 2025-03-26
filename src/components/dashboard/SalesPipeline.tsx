
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SalesPipeline = () => {
  // Mock data for sales pipeline
  const pipelineData = [
    { stage: "Lead", value: 45, fill: "#f97316" },
    { stage: "Qualified", value: 32, fill: "#0ea5e9" },
    { stage: "Proposal", value: 18, fill: "#8b5cf6" },
    { stage: "Negotiation", value: 12, fill: "#ec4899" },
    { stage: "Closed", value: 8, fill: "#22c55e" }
  ];
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded shadow-sm text-xs">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-muted-foreground">{`Contacts: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-md font-medium">Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={pipelineData}
              margin={{ top: 5, right: 30, left: 0, bottom: 20 }}
            >
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <YAxis 
                tickFormatter={(value) => `${value}`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPipeline;
