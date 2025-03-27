
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, TooltipProps } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Website", value: 40 },
  { name: "Referral", value: 30 },
  { name: "Social Media", value: 15 },
  { name: "Email", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-sm">
        <p className="font-medium" style={{ color: payload[0].color }}>{payload[0].name}</p>
        <p className="text-foreground">{`${payload[0].value}% of leads`}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {payload[0].name === "Website" && "From direct website visits and forms"}
          {payload[0].name === "Referral" && "From existing customer referrals"}
          {payload[0].name === "Social Media" && "From LinkedIn, Twitter, and Facebook"}
          {payload[0].name === "Email" && "From email marketing campaigns"}
          {payload[0].name === "Other" && "Includes events, phone calls, etc."}
        </p>
      </div>
    );
  }
  return null;
};

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
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(value) => <span className="font-medium">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadSourceReport;
