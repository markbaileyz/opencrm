
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Info, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export interface Workflow {
  id: string;
  name: string;
  description: string;
  active: boolean;
  lastExecuted?: string;
  nextExecution?: string;
  category: string;
}

interface WorkflowExecutionMonitorProps {
  workflows: Workflow[];
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
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Workflow Monitor</CardTitle>
          <CardDescription>
            Track and manage your automated workflows
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/workflow-analytics" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-xs">
                <th className="text-left font-medium py-2 px-2">Status</th>
                <th className="text-left font-medium py-2 px-2">Name</th>
                <th className="text-left font-medium py-2 px-2">Category</th>
                <th className="text-left font-medium py-2 px-2">Last Executed</th>
                <th className="text-left font-medium py-2 px-2">Next Run</th>
                <th className="text-left font-medium py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {workflows.map((workflow) => (
                <tr key={workflow.id}>
                  <td className="py-2 px-2">
                    <Badge variant={workflow.active ? "success" : "secondary"}>
                      {workflow.active ? "Active" : "Paused"}
                    </Badge>
                  </td>
                  <td className="py-2 px-2">{workflow.name}</td>
                  <td className="py-2 px-2">{workflow.category}</td>
                  <td className="py-2 px-2">{workflow.lastExecuted || "Never"}</td>
                  <td className="py-2 px-2">{workflow.nextExecution || "Not Scheduled"}</td>
                  <td className="py-2 px-2">
                    <div className="flex space-x-2">
                      {workflow.active ? (
                        <Button size="sm" variant="outline" onClick={() => onPause(workflow.id)}>
                          <Pause className="h-4 w-4" />
                          <span className="sr-only">Pause</span>
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600" 
                          onClick={() => onActivate(workflow.id)}
                        >
                          <Play className="h-4 w-4" />
                          <span className="sr-only">Activate</span>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => onViewDetails(workflow.id)}>
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Details</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {workflows.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted-foreground">
                    No workflows found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowExecutionMonitor;
