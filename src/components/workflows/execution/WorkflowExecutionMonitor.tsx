
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MonitorWorkflow {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "error";
  type: string;
  lastExecution?: string;
  successRate: number;
}

interface WorkflowExecutionMonitorProps {
  workflows: MonitorWorkflow[];
  onActivate: (id: string) => void;
  onPause: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const WorkflowExecutionMonitor: React.FC<WorkflowExecutionMonitorProps> = ({
  workflows,
  onActivate,
  onPause,
  onViewDetails
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Workflow Monitor</CardTitle>
        <CardDescription>Track and manage automated workflows</CardDescription>
      </CardHeader>
      <CardContent>
        {workflows.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No workflows available
          </div>
        ) : (
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="border rounded-lg p-3 flex flex-col space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{workflow.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {workflow.description}
                    </div>
                  </div>
                  <Badge
                    variant={
                      workflow.status === "active"
                        ? "default"
                        : workflow.status === "paused"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {workflow.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span>Success Rate</span>
                      <span>{workflow.successRate}%</span>
                    </div>
                    <Progress
                      value={workflow.successRate}
                      className="h-1"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-xs text-muted-foreground">
                    {workflow.lastExecution
                      ? `Last run: ${new Date(workflow.lastExecution).toLocaleString()}`
                      : "Never executed"}
                  </div>

                  <div className="flex space-x-2">
                    {workflow.status === "active" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPause(workflow.id)}
                      >
                        <Pause className="h-3.5 w-3.5" />
                        <span className="ml-1">Pause</span>
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onActivate(workflow.id)}
                      >
                        <Play className="h-3.5 w-3.5" />
                        <span className="ml-1">Activate</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(workflow.id)}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="ml-1">Details</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkflowExecutionMonitor;
