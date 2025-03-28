
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Edit, Trash, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Workflow } from "@/types/workflow";

interface WorkflowCardProps {
  workflow: Workflow;
  onActivate: (id: string) => void;
  onPause: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  onActivate,
  onPause,
  onEdit,
  onDelete,
  onView
}) => {
  const statusIcon = () => {
    switch (workflow.status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "paused":
        return <Pause className="h-4 w-4 text-amber-500" />;
      case "draft":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{workflow.name}</CardTitle>
          <Badge 
            variant={
              workflow.status === "active" ? "default" : 
              workflow.status === "paused" ? "outline" : 
              workflow.status === "draft" ? "secondary" : "destructive"
            }
            className="flex items-center gap-1"
          >
            {statusIcon()}
            {workflow.status}
          </Badge>
        </div>
        <CardDescription>{workflow.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Trigger:</span>
            <span>{workflow.trigger}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Steps:</span>
            <span>{workflow.steps.length}</span>
          </div>
          {workflow.lastRun && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Run:</span>
              <span>{new Date(workflow.lastRun).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-2">
        <Button variant="outline" size="sm" onClick={() => onView(workflow.id)}>
          View Details
        </Button>
        <div className="flex gap-2">
          {workflow.status === "active" ? (
            <Button variant="outline" size="icon" onClick={() => onPause(workflow.id)}>
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" size="icon" onClick={() => onActivate(workflow.id)}>
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={() => onEdit(workflow.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onDelete(workflow.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkflowCard;
