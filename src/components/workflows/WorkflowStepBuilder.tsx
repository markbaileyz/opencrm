
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WorkflowStep, WorkflowStepType } from "@/types/workflow";

interface WorkflowStepBuilderProps {
  steps: WorkflowStep[];
  onAddStep: (step: WorkflowStep) => void;
  onRemoveStep: (index: number) => void;
  onMoveStep: (fromIndex: number, toIndex: number) => void;
}

const WorkflowStepBuilder: React.FC<WorkflowStepBuilderProps> = ({
  steps,
  onAddStep,
  onRemoveStep,
  onMoveStep
}) => {
  const [stepType, setStepType] = useState<WorkflowStepType>("email");
  const [stepConfig, setStepConfig] = useState({
    subject: "",
    content: "",
    recipient: "patient",
    delay: "0",
    condition: "",
    assignee: "",
    message: "",
    templateId: "",
  });

  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      type: stepType,
      config: {
        ...getRelevantConfig()
      }
    };
    
    onAddStep(newStep);
    resetStepForm();
  };

  const resetStepForm = () => {
    setStepType("email");
    setStepConfig({
      subject: "",
      content: "",
      recipient: "patient",
      delay: "0",
      condition: "",
      assignee: "",
      message: "",
      templateId: "",
    });
  };

  const getRelevantConfig = () => {
    switch (stepType) {
      case "email":
        return {
          subject: stepConfig.subject,
          content: stepConfig.content,
          recipient: stepConfig.recipient,
        };
      case "sms":
        return {
          message: stepConfig.message,
          recipient: stepConfig.recipient,
        };
      case "task":
        return {
          subject: stepConfig.subject,
          description: stepConfig.content,
          assignee: stepConfig.assignee,
        };
      case "wait":
        return {
          delay: stepConfig.delay,
        };
      case "condition":
        return {
          condition: stepConfig.condition,
        };
      case "template":
        return {
          templateId: stepConfig.templateId,
        };
      default:
        return {};
    }
  };

  const renderStepForm = () => {
    switch (stepType) {
      case "email":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Select 
                value={stepConfig.recipient} 
                onValueChange={(value) => setStepConfig({...stepConfig, recipient: value})}
              >
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={stepConfig.subject}
                onChange={(e) => setStepConfig({...stepConfig, subject: e.target.value})}
                placeholder="Email subject"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                value={stepConfig.content}
                onChange={(e) => setStepConfig({...stepConfig, content: e.target.value})}
                placeholder="Email content"
                rows={3}
              />
            </div>
          </>
        );
      case "sms":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Select 
                value={stepConfig.recipient} 
                onValueChange={(value) => setStepConfig({...stepConfig, recipient: value})}
              >
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                value={stepConfig.message}
                onChange={(e) => setStepConfig({...stepConfig, message: e.target.value})}
                placeholder="SMS message content"
                rows={3}
              />
            </div>
          </>
        );
      case "task":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select 
                value={stepConfig.assignee} 
                onValueChange={(value) => setStepConfig({...stepConfig, assignee: value})}
              >
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="provider">Provider</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="frontdesk">Front Desk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={stepConfig.subject}
                onChange={(e) => setStepConfig({...stepConfig, subject: e.target.value})}
                placeholder="Task subject"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Description</Label>
              <Textarea 
                id="content" 
                value={stepConfig.content}
                onChange={(e) => setStepConfig({...stepConfig, content: e.target.value})}
                placeholder="Task description"
                rows={3}
              />
            </div>
          </>
        );
      case "wait":
        return (
          <div className="grid gap-2">
            <Label htmlFor="delay">Delay (hours)</Label>
            <Input 
              id="delay" 
              type="number"
              min="0"
              value={stepConfig.delay}
              onChange={(e) => setStepConfig({...stepConfig, delay: e.target.value})}
              placeholder="Delay in hours"
            />
          </div>
        );
      case "condition":
        return (
          <div className="grid gap-2">
            <Label htmlFor="condition">Condition</Label>
            <Textarea 
              id="condition" 
              value={stepConfig.condition}
              onChange={(e) => setStepConfig({...stepConfig, condition: e.target.value})}
              placeholder="Condition expression"
              rows={3}
            />
          </div>
        );
      case "template":
        return (
          <div className="grid gap-2">
            <Label htmlFor="templateId">Template</Label>
            <Select 
              value={stepConfig.templateId} 
              onValueChange={(value) => setStepConfig({...stepConfig, templateId: value})}
            >
              <SelectTrigger id="templateId">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Welcome Email</SelectItem>
                <SelectItem value="appointment_reminder">Appointment Reminder</SelectItem>
                <SelectItem value="follow_up">Follow-up</SelectItem>
                <SelectItem value="prescription_reminder">Prescription Reminder</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  // Helper function to get step title
  const getStepTitle = (step: WorkflowStep) => {
    switch (step.type) {
      case "email":
        return `Email: ${step.config.subject || "No subject"}`;
      case "sms":
        return `SMS: ${step.config.message?.substring(0, 20)}${step.config.message?.length > 20 ? "..." : ""}`;
      case "task":
        return `Task: ${step.config.subject || "No subject"}`;
      case "wait":
        return `Wait: ${step.config.delay} hours`;
      case "condition":
        return `Condition: ${step.config.condition?.substring(0, 20)}${step.config.condition?.length > 20 ? "..." : ""}`;
      case "template":
        return `Template: ${step.config.templateId}`;
      default:
        return "Unknown step";
    }
  };

  // Validation - enable Add Step button only when required fields are filled
  const isStepValid = () => {
    switch (stepType) {
      case "email":
        return stepConfig.subject.trim() !== "" && stepConfig.content.trim() !== "";
      case "sms":
        return stepConfig.message.trim() !== "";
      case "task":
        return stepConfig.subject.trim() !== "";
      case "wait":
        return stepConfig.delay !== "";
      case "condition":
        return stepConfig.condition.trim() !== "";
      case "template":
        return stepConfig.templateId !== "";
      default:
        return false;
    }
  };

  return (
    <div className="space-y-4">
      {/* List of existing steps */}
      {steps.length > 0 && (
        <div className="space-y-3">
          {steps.map((step, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">
                  Step {index + 1}: {getStepTitle(step)}
                </CardTitle>
              </CardHeader>
              <CardFooter className="py-2 flex justify-between">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMoveStep(index, index - 1)}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMoveStep(index, index + 1)}
                    disabled={index === steps.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => onRemoveStep(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add new step */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Add New Step</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="stepType">Step Type</Label>
            <Select value={stepType} onValueChange={(value) => setStepType(value as WorkflowStepType)}>
              <SelectTrigger id="stepType">
                <SelectValue placeholder="Select step type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Send Email</SelectItem>
                <SelectItem value="sms">Send SMS</SelectItem>
                <SelectItem value="task">Create Task</SelectItem>
                <SelectItem value="wait">Wait Time</SelectItem>
                <SelectItem value="condition">Condition</SelectItem>
                <SelectItem value="template">Use Template</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {renderStepForm()}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddStep} 
            disabled={!isStepValid()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkflowStepBuilder;
