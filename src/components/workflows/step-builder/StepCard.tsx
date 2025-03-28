
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Clipboard, ArrowUp, ArrowDown, Mail, Clock, MessageCircle, CheckSquare, GitBranch } from "lucide-react";
import { WorkflowStep } from "@/types/workflow";

interface StepCardProps {
  step: WorkflowStep;
  stepIndex: number;
  totalSteps: number;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onClick?: () => void;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  stepIndex,
  totalSteps,
  onRemove,
  onMoveUp,
  onMoveDown,
  onClick
}) => {
  const getTypeIcon = () => {
    switch (step.type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "wait":
        return <Clock className="h-4 w-4" />;
      case "sms":
        return <MessageCircle className="h-4 w-4" />;
      case "task":
        return <CheckSquare className="h-4 w-4" />;
      case "condition":
      case "branch":
        return <GitBranch className="h-4 w-4" />;
      case "template":
        return <Clipboard className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStepSummary = () => {
    switch (step.type) {
      case "email":
        return `Send email: ${step.config.subject || "No subject"}`;
      case "wait":
        return `Wait for ${step.config.delay || "some time"}`;
      case "sms":
        return `Send SMS to ${step.config.recipient || "recipient"}`;
      case "task":
        return `Create task: ${step.config.subject || "No subject"}`;
      case "condition":
        return `Check if ${step.config.condition || "condition"}`;
      case "template":
        return `Use template: ${step.config.templateId || "No template"}`;
      case "branch":
        return `Branch based on ${step.config.conditions?.length || 0} conditions`;
      default:
        return "Unknown step type";
    }
  };

  return (
    <Card className="shadow-sm hover:shadow transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon()}
            <span className="capitalize">{step.type}</span>
          </Badge>
          <div className="text-xs text-muted-foreground">Step {stepIndex + 1}</div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm">{getStepSummary()}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onRemove(); }}>
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div className="flex gap-1">
          {onMoveUp && stepIndex > 0 && (
            <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onMoveUp(); }}>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
          {onMoveDown && stepIndex < totalSteps - 1 && (
            <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onMoveDown(); }}>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default StepCard;
