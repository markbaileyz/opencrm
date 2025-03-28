
import React from "react";
import { Workflow } from "@/types/workflow";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pause, Eye, RotateCcw } from "lucide-react";
import { calculateProgress } from "./utils";

interface WorkflowExecutionCardProps {
  workflow: Workflow;
  onPause: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const WorkflowExecutionCard: React.FC<WorkflowExecutionCardProps> = ({
  workflow,
  onPause,
  onViewDetails
}) => {
  // Calculate execution progress based on steps
  const progress = calculateProgress(workflow);
  
  // Format the last run time
  const lastRunTime = workflow.lastRun 
    ? new Date(workflow.lastRun).toLocaleString()
    : "Not run yet";
  
  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="pt-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4">
            <h3 className="font-medium text-base">{workflow.name}</h3>
            <p className="text-sm text-muted-foreground">{workflow.trigger}</p>
          </div>
          
          <div className="col-span-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
          
          <div className="col-span-2 text-sm">
            <div className="text-muted-foreground">Last Run</div>
            <div>{lastRunTime}</div>
          </div>
          
          <div className="col-span-2 flex items-center justify-end space-x-2">
            <Button variant="outline" size="icon" onClick={() => onPause(workflow.id)}>
              <Pause className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onViewDetails(workflow.id)}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowExecutionCard;
