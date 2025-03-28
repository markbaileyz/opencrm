
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Gauge, BarChart3, Calendar, ArrowUpRight, TrendingUp, Activity } from "lucide-react";
import MetricCard from "./MetricCard";
import TopWorkflowsChart from "./TopWorkflowsChart";
import DailyExecutionsChart from "./DailyExecutionsChart";
import CategoriesPieChart from "./CategoriesPieChart";
import RecentExecutionsTable from "./RecentExecutionsTable";
import { useWorkflowAnalytics } from "../../hooks/useWorkflowAnalytics";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for execution history
const mockExecutionHistory = [
  { 
    id: "exec1", 
    workflowId: "wf-1", 
    workflowName: "New Patient Onboarding", 
    timestamp: new Date().toISOString(),
    duration: 3200, 
    success: true,
    stepCount: 5,
    category: "Patient"
  },
  { 
    id: "exec2", 
    workflowId: "wf-2", 
    workflowName: "Appointment Follow-up", 
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    duration: 1800, 
    success: true,
    stepCount: 3,
    category: "Appointment"
  },
  { 
    id: "exec3", 
    workflowId: "wf-3", 
    workflowName: "Medication Renewal", 
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    duration: 2500, 
    success: false,
    stepCount: 4,
    category: "Medication"
  },
  { 
    id: "exec4", 
    workflowId: "wf-1", 
    workflowName: "New Patient Onboarding", 
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    duration: 3000, 
    success: true,
    stepCount: 5,
    category: "Patient"
  },
  { 
    id: "exec5", 
    workflowId: "wf-4", 
    workflowName: "Lab Results Notification", 
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    duration: 1200, 
    success: true,
    stepCount: 2,
    category: "Labs"
  }
];

const WorkflowAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('week');
  const { isLoading, performanceData, categoryData, executionTimelineData, summaryMetrics } = useWorkflowAnalytics(timeRange);
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as 'week' | 'month' | 'quarter' | 'year');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workflow Analytics</h2>
          <p className="text-muted-foreground">
            Monitor and optimize your workflow performance
          </p>
        </div>
        
        <Tabs defaultValue="week" value={timeRange} onValueChange={handleTimeRangeChange}>
          <TabsList>
            <TabsTrigger value="week">7 Days</TabsTrigger>
            <TabsTrigger value="month">30 Days</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Success Rate"
            value={`${summaryMetrics.successRate}%`}
            icon={<Gauge className="h-4 w-4 text-blue-500" />}
            progressValue={summaryMetrics.successRate}
            progressColor="hsl(var(--success))"
          />
          <MetricCard
            title="Total Executions"
            value={summaryMetrics.totalExecutions}
            icon={<Activity className="h-4 w-4 text-indigo-500" />}
            progressValue={75}
            progressColor="#8b5cf6"
          />
          <MetricCard
            title="Average Execution Time"
            value={`${summaryMetrics.avgExecutionTime}s`}
            icon={<Calendar className="h-4 w-4 text-green-500" />}
            progressValue={65}
            progressColor="#10b981"
          />
          <MetricCard
            title="Active Workflows"
            value={summaryMetrics.activeWorkflows}
            icon={<TrendingUp className="h-4 w-4 text-orange-500" />}
            progressValue={80}
            progressColor="#f59e0b"
          />
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </>
        ) : (
          <>
            <DailyExecutionsChart executionsPerDay={executionTimelineData} />
            <TopWorkflowsChart topWorkflows={summaryMetrics.topWorkflows.map(wf => ({
              name: wf.name,
              count: wf.executions,
              successCount: Math.round(wf.executions * (wf.successRate / 100)),
              branchCount: Math.floor(Math.random() * 10) + 1, // Mock data
              avgBranchesPerExecution: +(Math.random() * 3 + 1).toFixed(1), // Mock data
              successRate: wf.successRate
            }))} />
          </>
        )}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </>
        ) : (
          <>
            <CategoriesPieChart categoryCounts={categoryData.reduce((acc, item) => {
              acc[item.name] = item.value;
              return acc;
            }, {} as Record<string, number>)} />
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Success rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Detailed performance trends will appear here</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <RecentExecutionsTable executionHistory={mockExecutionHistory} />
    </div>
  );
};

export default WorkflowAnalyticsDashboard;
