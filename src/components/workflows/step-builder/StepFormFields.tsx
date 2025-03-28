
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkflowStepType } from "@/types/workflow";

interface StepConfigType {
  subject: string;
  content: string;
  recipient: string;
  delay: string;
  condition: string;
  assignee: string;
  message: string;
  templateId: string;
}

interface StepFormFieldsProps {
  stepType: WorkflowStepType;
  stepConfig: StepConfigType;
  setStepConfig: (config: StepConfigType) => void;
}

const StepFormFields: React.FC<StepFormFieldsProps> = ({
  stepType,
  stepConfig,
  setStepConfig,
}) => {
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

export default StepFormFields;
