
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MessageSquare, 
  CheckSquare, 
  Clock, 
  FileCode, 
  Template, 
  GripVertical, 
  Trash2,
  GitBranch
} from "lucide-react";
import { WorkflowStep, WorkflowStepType } from "@/types/workflow";
import { Badge } from "@/components/ui/badge";

interface StepCardProps {
  step: WorkflowStep;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  isDragging?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  index,
  onEdit,
  onDelete,
  isDragging = false
}) => {
  // Helper function to get step icon
  const getStepIcon = (type: WorkflowStepType) => {
    switch (type) {
      case "email":
        return <Mail className="h-5 w-5 text-blue-500" />;
      case "sms":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "task":
        return <CheckSquare className="h-5 w-5 text-purple-500" />;
      case "wait":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "condition":
        return <FileCode className="h-5 w-5 text-rose-500" />;
      case "template":
        return <Template className="h-5 w-5 text-indigo-500" />;
      case "branch":
        return <GitBranch className="h-5 w-5 text-orange-500" />;
      default:
        return <CheckSquare className="h-5 w-5" />;
    }
  };
  
  // Helper function to get step title
  const getStepTitle = (step: WorkflowStep) => {
    switch (step.type) {
      case "email":
        return `Send Email: ${step.config.subject || "No subject"}`;
      case "sms":
        return "Send SMS";
      case "task":
        return `Create Task${step.config.assignee ? ` for ${step.config.assignee}` : ""}`;
      case "wait":
        return `Wait ${step.config.delay || ""}`;
      case "condition":
        return `Check if ${step.config.condition || "condition"}`;
      case "template":
        return `Use Template: ${step.config.templateId || "Unknown"}`;
      case "branch":
        return `Conditional Branch (${step.config.conditions?.length || 0} paths)`;
      default:
        return `Step ${index + 1}`;
    }
  };
  
  // Helper function to get step description
  const getStepDescription = (step: WorkflowStep) => {
    switch (step.type) {
      case "email":
        return step.config.recipient ? `To: ${step.config.recipient}` : "No recipient specified";
      case "sms":
        return step.config.recipient ? `To: ${step.config.recipient}` : "No recipient specified";
      case "task":
        return step.config.description || "No description";
      case "wait":
        return "Pause workflow execution";
      case "condition":
        return "Evaluate a condition";
      case "template":
        return "Use a predefined template";
      case "branch":
        return `${step.config.conditions?.length || 0} conditions with default path`;
      default:
        return "";
    }
  };

  // For branch type, render branch paths
  const renderBranchPaths = () => {
    if (step.type !== "branch" || !step.config.conditions) {
      return null;
    }

    return (
      <div className="mt-2 space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Paths:</p>
        <div className="space-y-1">
          {step.config.conditions.map((condition: any, idx: number) => (
            <div key={idx} className="flex items-center text-xs">
              <Badge variant="outline" className="mr-2">
                {idx + 1}
              </Badge>
              <span className="truncate">
                {condition.description || 
                  `${condition.field} ${condition.operator} ${condition.value || ""}`}
              </span>
            </div>
          ))}
          {step.config.defaultBranchId && (
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="mr-2 bg-muted">
                Default
              </Badge>
              <span>If no conditions match</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card 
      className={`mb-3 relative ${isDragging ? "border-primary bg-primary/5" : ""}`}
    >
      <div className="absolute left-2 top-0 bottom-0 flex items-center cursor-move">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <CardHeader className="py-3 pl-9 pr-4 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStepIcon(step.type)}
          <span className="font-medium">
            Step {index + 1}: {getStepTitle(step)}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onEdit(index)}
          >
            <span className="sr-only">Edit</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0 text-destructive"
            onClick={() => onDelete(index)}
          >
            <span className="sr-only">Delete</span>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 pl-9 pr-4">
        <p className="text-sm text-muted-foreground">
          {getStepDescription(step)}
        </p>
        {renderBranchPaths()}
      </CardContent>
    </Card>
  );
};

export default StepCard;
