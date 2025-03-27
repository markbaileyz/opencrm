
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Organization } from "@/types/organization";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"];

interface TypePieChartProps {
  organizations: Organization[];
}

// Custom tooltip for PieChart
const CustomTooltip = ({ active, payload, organizations }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-sm">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-primary">{`Count: ${payload[0].value}`}</p>
        <p className="text-muted-foreground text-xs">
          {`${Math.round((payload[0].value / organizations.length) * 100)}% of total`}
        </p>
      </div>
    );
  }
  return null;
};

const TypePieChart: React.FC<TypePieChartProps> = ({ organizations }) => {
  // Count organizations by type
  const orgCountByType = organizations.reduce((acc, org) => {
    acc[org.type] = (acc[org.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format data for type chart
  const typeChartData = Object.entries(orgCountByType)
    .map(([type, count]) => ({
      name: type,
      value: count
    }))
    .sort((a, b) => b.value - a.value);
    
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={typeChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {typeChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={(props) => <CustomTooltip {...props} organizations={organizations} />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TypePieChart;
