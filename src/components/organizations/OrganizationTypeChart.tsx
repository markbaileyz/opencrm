
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrganizations } from "@/context/OrganizationsContext";
import { OrganizationType } from "@/types/organization";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F", "#FFBB28", "#FF8042", "#A4DE6C", "#d0ed57"];

const OrganizationTypeChart = () => {
  const { organizations } = useOrganizations();
  
  // Count organizations by type
  const orgCountByType = organizations.reduce((acc, org) => {
    acc[org.type] = (acc[org.type] || 0) + 1;
    return acc;
  }, {} as Record<OrganizationType, number>);
  
  // Format data for chart
  const data = Object.entries(orgCountByType).map(([type, count]) => ({
    name: type,
    value: count
  }));
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Types</CardTitle>
        <CardDescription>Distribution of organizations by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationTypeChart;
