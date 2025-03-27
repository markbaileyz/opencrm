
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Organization } from "@/types/organization";

interface SizeBarChartProps {
  organizations: Organization[];
}

// Custom tooltip
const CustomTooltip = ({ active, payload, organizations }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-sm">
        <p className="font-medium">{`${payload[0].payload.size}`}</p>
        <p className="text-primary">{`Count: ${payload[0].value}`}</p>
        <p className="text-muted-foreground text-xs">
          {`${Math.round((payload[0].value / organizations.length) * 100)}% of total`}
        </p>
      </div>
    );
  }
  return null;
};

const SizeBarChart: React.FC<SizeBarChartProps> = ({ organizations }) => {
  // Count organizations by size
  const sizeCount: Record<string, number> = { "Small": 0, "Medium": 0, "Large": 0, "Enterprise": 0, "Unknown": 0 };
  
  organizations.forEach(org => {
    if (org.size) {
      sizeCount[org.size] = (sizeCount[org.size] || 0) + 1;
    } else {
      sizeCount["Unknown"] = (sizeCount["Unknown"] || 0) + 1;
    }
  });
  
  // Format data for size chart
  const sizeChartData = Object.entries(sizeCount)
    .filter(([_, count]) => count > 0)
    .map(([size, count]) => ({
      size,
      count
    }));
    
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sizeChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="size" />
          <YAxis />
          <Tooltip content={(props) => <CustomTooltip {...props} organizations={organizations} />} />
          <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SizeBarChart;
