
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { WorkflowExecution } from "../../types/executionHistory";
import { useExecutionHistory } from "../../hooks/useExecutionHistory";
import { formatDuration } from "./analyticsUtils";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';

const MAX_ITEMS = 5;

const WorkflowActivityMonitor: React.FC = () => {
  const { executionHistory } = useExecutionHistory();
  const [recentActivity, setRecentActivity] = useState<WorkflowExecution[]>([]);
  
  useEffect(() => {
    // Filter and sort to get the most recent executions
    const sorted = [...executionHistory]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, MAX_ITEMS);
    
    setRecentActivity(sorted);
  }, [executionHistory]);
  
  // Function to get the appropriate icon based on execution status
  const getStatusIcon = (execution: WorkflowExecution) => {
    if (execution.success) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Real-time Workflow Activity</CardTitle>
            <CardDescription>Most recent workflow executions</CardDescription>
          </div>
          <Activity className="h-5 w-5 text-primary animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((execution) => (
              <div key={execution.id} className="flex items-start gap-3 p-2 rounded-md border bg-card hover:bg-muted/50 transition-colors">
                <div className="mt-0.5">{getStatusIcon(execution)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium truncate">{execution.workflowName}</h4>
                    <Badge variant={execution.success ? "success" : "destructive"} className="ml-2">
                      {execution.success ? "Success" : "Failed"}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="truncate">
                      {execution.message || (execution.success 
                        ? "Completed successfully" 
                        : `Failed: ${execution.errorMessage || "Unknown error"}`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{formatDistanceToNow(new Date(execution.timestamp))} ago</span>
                    {execution.duration && (
                      <>
                        <span>•</span>
                        <span>{formatDuration(execution.duration)}</span>
                      </>
                    )}
                    {execution.branchesUsed !== undefined && execution.branchesUsed > 0 && (
                      <>
                        <span>•</span>
                        <span>{execution.branchesUsed} branches</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No recent workflow activity</p>
            <p className="text-xs text-muted-foreground">Workflow execution data will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkflowActivityMonitor;
