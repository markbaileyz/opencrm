
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, LineChart, CheckCircle, XCircle, Clock, Zap } from "lucide-react";
import { WorkflowExecution, AnalyticsData } from "../types/executionHistory";
import MetricCard from "./analytics/MetricCard";
import DailyExecutionsChart from "./analytics/DailyExecutionsChart";
import CategoriesPieChart from "./analytics/CategoriesPieChart";
import TopWorkflowsChart from "./analytics/TopWorkflowsChart";
import RecentExecutionsTable from "./analytics/RecentExecutionsTable";
import { formatDuration } from "./analytics/analyticsUtils";

interface WorkflowAnalyticsProps {
  executionHistory: WorkflowExecution[];
  analyticsData: AnalyticsData;
}

const WorkflowAnalytics: React.FC<WorkflowAnalyticsProps> = ({
  executionHistory,
  analyticsData
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Summary Cards */}
        <MetricCard 
          title="Total Executions" 
          value={analyticsData.totalExecutions}
          icon={<Zap className="h-4 w-4 text-muted-foreground" />}
        />
        
        <MetricCard 
          title="Success Rate" 
          value={`${analyticsData.successRate.toFixed(1)}%`}
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          progressValue={analyticsData.successRate}
        />
        
        <MetricCard 
          title="Failed Executions" 
          value={analyticsData.failedExecutions}
          icon={<XCircle className="h-4 w-4 text-red-500" />}
        />
        
        <MetricCard 
          title="Avg. Duration" 
          value={formatDuration(analyticsData.averageDuration)}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
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
          <DailyExecutionsChart executionsPerDay={analyticsData.executionsPerDay} />
        </TabsContent>
        
        <TabsContent value="categories" className="m-0">
          <CategoriesPieChart categoryCounts={analyticsData.categoryCounts} />
        </TabsContent>
        
        <TabsContent value="topWorkflows" className="m-0">
          <TopWorkflowsChart topWorkflows={analyticsData.topWorkflows} />
        </TabsContent>
      </Tabs>
      
      <RecentExecutionsTable 
        executionHistory={executionHistory}
      />
    </div>
  );
};

export default WorkflowAnalytics;
