
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { useWorkflowAnalytics } from "../hooks/useWorkflowAnalytics";
import WorkflowPerformanceChart from "./WorkflowPerformanceChart";
import WorkflowCategoryDistribution from "./WorkflowCategoryDistribution";
import WorkflowExecutionTimeline from "./WorkflowExecutionTimeline";
import { CalendarRange, BarChart3, PieChart, Activity } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WorkflowAnalyticsDashboardProps {
  className?: string;
}

const WorkflowAnalyticsDashboard: React.FC<WorkflowAnalyticsDashboardProps> = ({ className = "" }) => {
  const [timeRange, setTimeRange] = React.useState<"week" | "month" | "quarter" | "year">("week");
  const { 
    performanceData, 
    categoryData, 
    isLoading, 
    executionTimelineData,
    summaryMetrics
  } = useWorkflowAnalytics(timeRange);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workflow Analytics</h2>
          <p className="text-muted-foreground">Monitor your workflow performance and execution statistics</p>
        </div>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              {summaryMetrics.successRateTrend > 0 ? '+' : ''}
              {summaryMetrics.successRateTrend}% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.totalExecutions}</div>
            <p className="text-xs text-muted-foreground">
              {summaryMetrics.executionsTrend > 0 ? '+' : ''}
              {summaryMetrics.executionsTrend}% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Execution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.avgExecutionTime}s</div>
            <p className="text-xs text-muted-foreground">
              {summaryMetrics.executionTimeTrend < 0 ? '+' : ''}
              {Math.abs(summaryMetrics.executionTimeTrend)}% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.activeWorkflows}</div>
            <p className="text-xs text-muted-foreground">
              {summaryMetrics.activeWorkflowsTrend > 0 ? '+' : ''}
              {summaryMetrics.activeWorkflowsTrend}% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-1">
            <PieChart className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>Timeline</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance</CardTitle>
              <CardDescription>
                Success rate and execution count over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkflowPerformanceChart data={performanceData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Categories</CardTitle>
              <CardDescription>
                Distribution of workflows by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkflowCategoryDistribution data={categoryData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution Timeline</CardTitle>
              <CardDescription>
                Workflow executions over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkflowExecutionTimeline data={executionTimelineData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Top Workflows</CardTitle>
          <CardDescription>
            Most frequently executed workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2">Workflow Name</th>
                  <th className="text-left font-medium p-2">Category</th>
                  <th className="text-left font-medium p-2">Executions</th>
                  <th className="text-left font-medium p-2">Success Rate</th>
                  <th className="text-left font-medium p-2">Avg Time</th>
                </tr>
              </thead>
              <tbody>
                {summaryMetrics.topWorkflows.map((workflow, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{workflow.name}</td>
                    <td className="p-2">{workflow.category}</td>
                    <td className="p-2">{workflow.executions}</td>
                    <td className="p-2">{workflow.successRate}%</td>
                    <td className="p-2">{workflow.avgTime}s</td>
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

export default WorkflowAnalyticsDashboard;
