
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
import { Gauge, BarChart3, Calendar, TrendingUp, Activity } from "lucide-react";
import { format, parseISO } from "date-fns";
import MetricCard from "./MetricCard";
import TopWorkflowsChart from "./TopWorkflowsChart";
import DailyExecutionsChart from "./DailyExecutionsChart";
import CategoriesPieChart from "./CategoriesPieChart";
import RecentExecutionsTable from "./RecentExecutionsTable";
import WorkflowActivityMonitor from "./WorkflowActivityMonitor";
import { useWorkflowAnalytics } from "../../hooks/useWorkflowAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { useExecutionHistory } from "../../hooks/useExecutionHistory";

const WorkflowAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('week');
  const { isLoading, performanceData, categoryData, executionTimelineData, summaryMetrics } = useWorkflowAnalytics(timeRange);
  const { executionHistory } = useExecutionHistory();
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as 'week' | 'month' | 'quarter' | 'year');
  };

  // Transform timeline data to match the expected format for DailyExecutionsChart
  const transformedTimelineData = executionTimelineData.map(item => {
    let validDate = item.date;
    
    if (!/^\d{4}-\d{2}-\d{2}/.test(item.date)) {
      const now = new Date();
      const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(item.date);
      
      if (dayIndex !== -1) {
        const day = new Date();
        day.setDate(day.getDate() - (day.getDay() - dayIndex + 7) % 7);
        validDate = format(day, 'yyyy-MM-dd');
      } else {
        validDate = format(now, 'yyyy-MM-dd');
      }
    }
    
    return {
      date: validDate,
      count: item.executions
    };
  });

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
            <DailyExecutionsChart executionsPerDay={transformedTimelineData} />
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
            <WorkflowActivityMonitor />
          </>
        )}
      </div>

      <RecentExecutionsTable executionHistory={executionHistory} />
    </div>
  );
};

export default WorkflowAnalyticsDashboard;
