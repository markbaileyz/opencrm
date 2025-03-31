
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Clock, Activity } from "lucide-react";
import { useExecutionHistory } from "../../hooks/useExecutionHistory";

const WorkflowActivityMonitor: React.FC = () => {
  const { executionHistory } = useExecutionHistory();
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  // Get the 6 most recent executions
  useEffect(() => {
    const recent = executionHistory
      .slice(0, 6)
      .map(execution => ({
        id: execution.id,
        workflowName: execution.workflowName,
        timestamp: execution.timestamp,
        success: execution.success,
        duration: execution.duration,
        message: execution.message || (execution.success ? "Completed successfully" : "Failed to complete"),
        category: execution.category
      }));
    
    setRecentActivities(recent);
  }, [executionHistory]);

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const executionTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - executionTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-primary" />
          Workflow Activity Monitor
        </CardTitle>
        <CardDescription>Recent workflow executions in real-time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="mr-3">
                  {activity.success ? (
                    <CircleCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <CircleX className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate">{activity.workflowName}</p>
                    <Badge variant={activity.success ? "outline" : "destructive"} className="ml-2">
                      {activity.success ? "Success" : "Failed"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{activity.message}</p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {getTimeAgo(activity.timestamp)}
                    {activity.category && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{activity.category}</span>
                      </>
                    )}
                    <span className="mx-1">•</span>
                    <span>{(activity.duration / 1000).toFixed(2)}s</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-10 w-10 mx-auto mb-2 opacity-30" />
              <p>No recent workflow activity</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowActivityMonitor;
