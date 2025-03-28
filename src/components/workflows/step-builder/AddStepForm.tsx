
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
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
import { WorkflowStep, WorkflowStepType } from "@/types/workflow";
import StepFormFields from "./StepFormFields";
import { isStepValid, getRelevantConfig } from "./utils";

interface AddStepFormProps {
  onAddStep: (step: WorkflowStep) => void;
}

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

const initialStepConfig = {
  subject: "",
  content: "",
  recipient: "patient",
  delay: "0",
  condition: "",
  assignee: "",
  message: "",
  templateId: "",
};

const AddStepForm: React.FC<AddStepFormProps> = ({ onAddStep }) => {
  const [stepType, setStepType] = useState<WorkflowStepType>("email");
  const [stepConfig, setStepConfig] = useState<StepConfigType>(initialStepConfig);

  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      type: stepType,
      config: {
        ...getRelevantConfig(stepType, stepConfig)
      }
    };
    
    onAddStep(newStep);
    resetStepForm();
  };

  const resetStepForm = () => {
    setStepType("email");
    setStepConfig(initialStepConfig);
  };

  return (
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
        
        <StepFormFields 
          stepType={stepType} 
          stepConfig={stepConfig} 
          setStepConfig={setStepConfig} 
        />
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAddStep} 
          disabled={!isStepValid(stepType, stepConfig)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Step
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddStepForm;
