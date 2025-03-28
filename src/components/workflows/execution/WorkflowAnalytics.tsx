
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, PieChart, LineChart, CheckCircle, XCircle, Clock, Zap } from "lucide-react";
import { format, parseISO } from "date-fns";
import { WorkflowExecution } from "../hooks/useExecutionHistory";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart as ReLineChart, Line } from "recharts";

interface AnalyticsData {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  successRate: number;
  averageDuration: number;
  categoryCounts: Record<string, number>;
  executionsPerDay: { date: string; count: number }[];
  topWorkflows: {
    name: string;
    count: number;
    successCount: number;
    successRate: number;
  }[];
}

interface WorkflowAnalyticsProps {
  executionHistory: WorkflowExecution[];
  analyticsData: AnalyticsData;
}

const WorkflowAnalytics: React.FC<WorkflowAnalyticsProps> = ({
  executionHistory,
  analyticsData
}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const pieData = Object.entries(analyticsData.categoryCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Summary Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analyticsData.totalExecutions}</div>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{analyticsData.successRate.toFixed(1)}%</div>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <Progress 
                value={analyticsData.successRate} 
                className="h-2" 
                style={{
                  background: "hsl(var(--secondary))",
                }}
                indicatorStyle={{
                  background: analyticsData.successRate > 90 
                    ? "hsl(var(--success))" 
                    : analyticsData.successRate > 70 
                      ? "hsl(var(--warning))" 
                      : "hsl(var(--destructive))"
                }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analyticsData.failedExecutions}</div>
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatDuration(analyticsData.averageDuration)}</div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Daily Executions</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger value="topWorkflows" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Top Workflows</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Daily Workflow Executions</CardTitle>
              <CardDescription>Number of workflow executions over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={analyticsData.executionsPerDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => format(parseISO(value), 'MMM d')}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} executions`, 'Count']}
                      labelFormatter={(value) => format(parseISO(value), 'MMMM d, yyyy')}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Executions"
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Categories</CardTitle>
              <CardDescription>Distribution of workflow executions by category</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-full max-w-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} executions`, 'Count']}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="topWorkflows" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Top Workflows</CardTitle>
              <CardDescription>Most frequently executed workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={analyticsData.topWorkflows}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === "successRate") return [`${Number(value).toFixed(1)}%`, 'Success Rate'];
                        return [`${value} executions`, name === "count" ? 'Total' : 'Successful'];
                      }}
                    />
                    <Bar dataKey="count" fill="#8884d8" name="Total Executions" />
                    <Bar dataKey="successCount" fill="#82ca9d" name="Successful" />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Workflow Executions</CardTitle>
          <CardDescription>Details of the most recent workflow executions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2">Workflow</th>
                  <th className="text-left font-medium p-2">Category</th>
                  <th className="text-left font-medium p-2">Status</th>
                  <th className="text-left font-medium p-2">Duration</th>
                  <th className="text-left font-medium p-2">Steps</th>
                  <th className="text-left font-medium p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {executionHistory.slice(0, 10).map((execution) => (
                  <tr key={execution.id} className="border-b">
                    <td className="p-2">{execution.workflowName}</td>
                    <td className="p-2">{execution.category || "Uncategorized"}</td>
                    <td className="p-2">
                      {execution.success ? (
                        <span className="flex items-center text-green-500">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Success
                        </span>
                      ) : (
                        <span className="flex items-center text-red-500">
                          <XCircle className="h-4 w-4 mr-1" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="p-2">{execution.duration ? formatDuration(execution.duration) : "N/A"}</td>
                    <td className="p-2">{execution.stepCount || "N/A"}</td>
                    <td className="p-2">{format(new Date(execution.timestamp), "MMM d, yyyy HH:mm")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowAnalytics;
