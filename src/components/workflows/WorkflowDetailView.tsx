
import React from "react";
import { Workflow, WorkflowStep } from "@/types/workflow";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Edit, Trash, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

interface WorkflowDetailViewProps {
  workflow: Workflow;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onActivate: (id: string) => void;
  onPause: (id: string) => void;
}

const WorkflowDetailView: React.FC<WorkflowDetailViewProps> = ({
  workflow,
  onBack,
  onEdit,
  onDelete,
  onActivate,
  onPause,
}) => {
  const getStepTitle = (step: WorkflowStep) => {
    switch (step.type) {
      case "email":
        return `Send Email: ${step.config.subject || "No subject"}`;
      case "sms":
        return `Send SMS: ${step.config.message?.substring(0, 30)}${step.config.message?.length > 30 ? "..." : ""}`;
      case "task":
        return `Create Task: ${step.config.subject || "No subject"}`;
      case "wait":
        return `Wait: ${step.config.delay} hours`;
      case "condition":
        return `Condition: ${step.config.condition?.substring(0, 30)}${step.config.condition?.length > 30 ? "..." : ""}`;
      case "template":
        return `Use Template: ${step.config.templateId}`;
      default:
        return "Unknown step";
    }
  };

  const getStepDescription = (step: WorkflowStep) => {
    switch (step.type) {
      case "email":
        return (
          <>
            <p><strong>To:</strong> {step.config.recipient}</p>
            <p><strong>Subject:</strong> {step.config.subject}</p>
            <p className="mt-2">{step.config.content}</p>
          </>
        );
      case "sms":
        return (
          <>
            <p><strong>To:</strong> {step.config.recipient}</p>
            <p className="mt-2">{step.config.message}</p>
          </>
        );
      case "task":
        return (
          <>
            <p><strong>Assignee:</strong> {step.config.assignee}</p>
            <p><strong>Subject:</strong> {step.config.subject}</p>
            <p className="mt-2">{step.config.description}</p>
          </>
        );
      case "wait":
        return <p>Pause workflow execution for {step.config.delay} hours.</p>;
      case "condition":
        return <p>Evaluate condition: {step.config.condition}</p>;
      case "template":
        return <p>Use template: {step.config.templateId}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workflows
          </Button>
          <h1 className="text-2xl font-bold">{workflow.name}</h1>
          <div className="flex items-center space-x-2">
            <Badge
              variant={
                workflow.status === "active" ? "default" : 
                workflow.status === "paused" ? "outline" : 
                workflow.status === "draft" ? "secondary" : "destructive"
              }
            >
              {workflow.status}
            </Badge>
            <span className="text-muted-foreground text-sm">
              Trigger: {workflow.trigger}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          {workflow.status === "active" ? (
            <Button onClick={() => onPause(workflow.id)} variant="outline">
              <Pause className="mr-2 h-4 w-4" />
              Pause Workflow
            </Button>
          ) : (
            <Button onClick={() => onActivate(workflow.id)} variant="default">
              <Play className="mr-2 h-4 w-4" />
              Activate Workflow
            </Button>
          )}
          <Button onClick={() => onEdit(workflow.id)} variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button onClick={() => onDelete(workflow.id)} variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Description</h3>
            <p className="text-muted-foreground">{workflow.description || "No description"}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-muted-foreground">
                {format(new Date(workflow.createdAt), "MMM d, yyyy")}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Last Updated</h3>
              <p className="text-muted-foreground">
                {format(new Date(workflow.updatedAt), "MMM d, yyyy")}
              </p>
            </div>
            {workflow.lastRun && (
              <div>
                <h3 className="font-medium mb-1">Last Run</h3>
                <p className="text-muted-foreground">
                  {format(new Date(workflow.lastRun), "MMM d, yyyy h:mm a")}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4">Workflow Steps</h2>
        <div className="space-y-4">
          {workflow.steps.map((step, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3">
                    {index + 1}
                  </div>
                  <CardTitle className="text-base font-medium">
                    {getStepTitle(step)}
                  </CardTitle>
                </div>
                <CardDescription className="ml-9">
                  {step.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-9">
                <div className="text-sm">
                  {getStepDescription(step)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetailView;
