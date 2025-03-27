
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrganizations } from "@/context/OrganizationsContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, PieChart as PieChartIcon } from "lucide-react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"];

const OrganizationInsights = () => {
  const { organizations } = useOrganizations();
  const [activeTab, setActiveTab] = useState("overview");

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

  // Count organizations by status
  const statusCount: Record<string, number> = {
    "Active": 0,
    "Inactive": 0,
    "Pending": 0,
    "Archived": 0
  };
  
  organizations.forEach(org => {
    statusCount[org.status] = (statusCount[org.status] || 0) + 1;
  });

  // Format data for status chart
  const statusChartData = Object.entries(statusCount)
    .map(([status, count]) => ({ status, count }));

  // Custom tooltip for PieChart
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
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Organization Insights</CardTitle>
          <Badge variant="outline" className="ml-2">
            {organizations.length} Organizations
          </Badge>
        </div>
        <CardDescription>Overview of your partner organizations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Types</span>
            </TabsTrigger>
            <TabsTrigger value="sizes" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Sizes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(statusCount).map(([status, count]) => (
                <div key={status} className="flex flex-col p-4 border rounded-lg">
                  <span className="text-sm text-muted-foreground">{status}</span>
                  <span className="text-2xl font-semibold">{count}</span>
                  <div className="mt-2">
                    <Progress 
                      value={Math.round((count / organizations.length) * 100)} 
                      className="h-1.5"
                      style={{
                        background: "hsl(var(--secondary))",
                      }}
                      indicatorStyle={{
                        background: status === "Active" ? "hsl(var(--success))" :
                                  status === "Inactive" ? "hsl(var(--muted-foreground))" :
                                  status === "Pending" ? "hsl(var(--warning))" :
                                  "hsl(var(--destructive))"
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {Math.round((count / organizations.length) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="types">
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
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="sizes">
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
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrganizationInsights;
