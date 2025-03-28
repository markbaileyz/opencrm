
import React from "react";
import { WorkflowStep, WorkflowStepType } from "@/types/workflow";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BranchStepForm from "./BranchStepForm";

interface StepFormFieldsProps {
  type: WorkflowStepType;
  config: any;
  onChange: (config: any) => void;
  allSteps?: WorkflowStep[];
  currentStepIndex?: number;
}

const StepFormFields: React.FC<StepFormFieldsProps> = ({ 
  type, 
  config, 
  onChange,
  allSteps = [],
  currentStepIndex = -1
}) => {
  // Common handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...config,
      [e.target.name]: e.target.value
    });
  };

  // Common handler for select changes
  const handleSelectChange = (name: string, value: string) => {
    onChange({
      ...config,
      [name]: value
    });
  };

  // Different form fields based on step type
  const renderFormFields = () => {
    switch (type) {
      case "email":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor="recipient">Recipient</FormLabel>
                <Input 
                  id="recipient"
                  name="recipient"
                  value={config.recipient || ""}
                  onChange={handleInputChange}
                  placeholder="Email or patient field"
                />
              </div>
              <div>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input 
                  id="subject"
                  name="subject"
                  value={config.subject || ""}
                  onChange={handleInputChange}
                  placeholder="Email subject"
                />
              </div>
            </div>
            <div>
              <FormLabel htmlFor="content">Email Content</FormLabel>
              <Textarea 
                id="content"
                name="content"
                value={config.content || ""}
                onChange={handleInputChange}
                rows={5}
                placeholder="Email content"
              />
            </div>
          </div>
        );
      
      case "sms":
        return (
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="recipient">Recipient</FormLabel>
              <Input 
                id="recipient"
                name="recipient"
                value={config.recipient || ""}
                onChange={handleInputChange}
                placeholder="Phone number or patient field"
              />
            </div>
            <div>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea 
                id="message"
                name="message"
                value={config.message || ""}
                onChange={handleInputChange}
                rows={3}
                placeholder="SMS message content"
              />
            </div>
          </div>
        );
      
      case "task":
        return (
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="assignee">Assignee</FormLabel>
              <Input 
                id="assignee"
                name="assignee"
                value={config.assignee || ""}
                onChange={handleInputChange}
                placeholder="User or role"
              />
            </div>
            <div>
              <FormLabel htmlFor="description">Task Description</FormLabel>
              <Textarea 
                id="description"
                name="description"
                value={config.description || ""}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe the task"
              />
            </div>
          </div>
        );
      
      case "wait":
        return (
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="delay">Wait Duration</FormLabel>
              <Input 
                id="delay"
                name="delay"
                value={config.delay || ""}
                onChange={handleInputChange}
                placeholder="e.g., 1d, 2h, 30m"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Format: 1d (1 day), 2h (2 hours), 30m (30 minutes)
              </p>
            </div>
          </div>
        );
      
      case "condition":
        return (
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="condition">Condition</FormLabel>
              <Input 
                id="condition"
                name="condition"
                value={config.condition || ""}
                onChange={handleInputChange}
                placeholder="e.g., patient.age > 18"
              />
            </div>
          </div>
        );
      
      case "template":
        return (
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="templateId">Template</FormLabel>
              <Select 
                value={config.templateId || ""} 
                onValueChange={(value) => handleSelectChange("templateId", value)}
              >
                <SelectTrigger id="templateId">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome_email">Welcome Email</SelectItem>
                  <SelectItem value="appointment_reminder">Appointment Reminder</SelectItem>
                  <SelectItem value="follow_up">Follow-up</SelectItem>
                  <SelectItem value="prescription_renewal">Prescription Renewal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "branch":
        return (
          <BranchStepForm 
            config={config}
            onChange={onChange}
            allSteps={allSteps}
            currentStepIndex={currentStepIndex}
          />
        );
      
      default:
        return (
          <div className="text-center py-4 text-muted-foreground">
            No configuration needed for this step type.
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderFormFields()}
    </div>
  );
};

export default StepFormFields;
