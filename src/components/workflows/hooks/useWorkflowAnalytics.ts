
import { useState, useEffect } from 'react';

// Types for the data returned by the hook
interface PerformanceDataPoint {
  date: string;
  successCount: number;
  failureCount: number;
  successRate: number;
}

interface CategoryDataPoint {
  name: string;
  value: number;
  color: string;
}

interface TimelineDataPoint {
  date: string;
  executions: number;
  avgExecutionTime: number;
}

interface TopWorkflow {
  name: string;
  category: string;
  executions: number;
  successRate: number;
  avgTime: number;
}

interface SummaryMetrics {
  successRate: number;
  successRateTrend: number;
  totalExecutions: number;
  executionsTrend: number;
  avgExecutionTime: number;
  executionTimeTrend: number;
  activeWorkflows: number;
  activeWorkflowsTrend: number;
  topWorkflows: TopWorkflow[];
}

export function useWorkflowAnalytics(timeRange: 'week' | 'month' | 'quarter' | 'year' = 'week') {
  const [isLoading, setIsLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataPoint[]>([]);
  const [executionTimelineData, setExecutionTimelineData] = useState<TimelineDataPoint[]>([]);
  const [summaryMetrics, setSummaryMetrics] = useState<SummaryMetrics>({
    successRate: 0,
    successRateTrend: 0,
    totalExecutions: 0,
    executionsTrend: 0,
    avgExecutionTime: 0,
    executionTimeTrend: 0,
    activeWorkflows: 0,
    activeWorkflowsTrend: 0,
    topWorkflows: []
  });

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setIsLoading(true);

    // Simulate API call with timeout
    const timer = setTimeout(() => {
      // Generate mock data based on the selected time range
      generateMockData(timeRange);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRange]);

  const generateMockData = (range: string) => {
    // Generate performance data
    const perfData: PerformanceDataPoint[] = [];
    const numPoints = range === 'week' ? 7 : range === 'month' ? 30 : range === 'quarter' ? 13 : 12;
    
    for (let i = 0; i < numPoints; i++) {
      const successCount = Math.floor(Math.random() * 30) + 20;
      const failureCount = Math.floor(Math.random() * 10);
      const total = successCount + failureCount;
      
      perfData.push({
        date: range === 'week' 
          ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7]
          : range === 'month' 
            ? `Day ${i + 1}`
            : range === 'quarter' 
              ? `Week ${i + 1}`
              : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        successCount,
        failureCount,
        successRate: Math.round((successCount / total) * 100)
      });
    }
    setPerformanceData(perfData);

    // Generate category data
    const categories = [
      { name: 'Email', value: Math.floor(Math.random() * 30) + 10, color: '#8b5cf6' },
      { name: 'CRM', value: Math.floor(Math.random() * 25) + 15, color: '#3b82f6' },
      { name: 'Marketing', value: Math.floor(Math.random() * 20) + 5, color: '#10b981' },
      { name: 'Sales', value: Math.floor(Math.random() * 15) + 10, color: '#f59e0b' },
      { name: 'Support', value: Math.floor(Math.random() * 10) + 5, color: '#ef4444' }
    ];
    setCategoryData(categories);

    // Generate timeline data
    const timelineData: TimelineDataPoint[] = [];
    for (let i = 0; i < numPoints; i++) {
      timelineData.push({
        date: perfData[i].date,
        executions: perfData[i].successCount + perfData[i].failureCount,
        avgExecutionTime: Math.random() * 5 + 0.5
      });
    }
    setExecutionTimelineData(timelineData);

    // Generate summary metrics
    const totalSuccess = perfData.reduce((sum, item) => sum + item.successCount, 0);
    const totalFailures = perfData.reduce((sum, item) => sum + item.failureCount, 0);
    const totalExec = totalSuccess + totalFailures;
    const successRate = Math.round((totalSuccess / totalExec) * 100);
    
    const avgExecTime = timelineData.reduce((sum, item) => sum + item.avgExecutionTime, 0) / timelineData.length;
    
    // Generate top workflows
    const topWorkflows: TopWorkflow[] = [
      {
        name: 'New Customer Onboarding',
        category: 'CRM',
        executions: Math.floor(Math.random() * 100) + 50,
        successRate: Math.floor(Math.random() * 15) + 85,
        avgTime: Math.random() * 3 + 1
      },
      {
        name: 'Email Campaign Automation',
        category: 'Marketing',
        executions: Math.floor(Math.random() * 80) + 40,
        successRate: Math.floor(Math.random() * 20) + 80,
        avgTime: Math.random() * 2 + 0.5
      },
      {
        name: 'Lead Qualification',
        category: 'Sales',
        executions: Math.floor(Math.random() * 60) + 30,
        successRate: Math.floor(Math.random() * 10) + 88,
        avgTime: Math.random() * 4 + 2
      },
      {
        name: 'Support Ticket Assignment',
        category: 'Support',
        executions: Math.floor(Math.random() * 50) + 25,
        successRate: Math.floor(Math.random() * 5) + 95,
        avgTime: Math.random() * 1 + 0.2
      },
      {
        name: 'Daily Report Generation',
        category: 'CRM',
        executions: Math.floor(Math.random() * 30) + 20,
        successRate: Math.floor(Math.random() * 10) + 90,
        avgTime: Math.random() * 5 + 3
      }
    ];

    setSummaryMetrics({
      successRate,
      successRateTrend: Math.floor(Math.random() * 10) - 3,
      totalExecutions: totalExec,
      executionsTrend: Math.floor(Math.random() * 15) + 5,
      avgExecutionTime: parseFloat(avgExecTime.toFixed(2)),
      executionTimeTrend: Math.floor(Math.random() * 10) - 5,
      activeWorkflows: Math.floor(Math.random() * 20) + 10,
      activeWorkflowsTrend: Math.floor(Math.random() * 8) - 2,
      topWorkflows
    });
  };

  return {
    isLoading,
    performanceData,
    categoryData,
    executionTimelineData,
    summaryMetrics
  };
}
