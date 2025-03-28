
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { WorkflowStep, WorkflowStepType } from "@/types/workflow";
import StepFormFields from "./StepFormFields";
import { v4 as uuidv4 } from "uuid";

interface AddStepFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStep: (step: WorkflowStep) => void;
  allSteps: WorkflowStep[];
}

const AddStepForm: React.FC<AddStepFormProps> = ({
  open,
  onOpenChange,
  onAddStep,
  allSteps
}) => {
  const [stepType, setStepType] = useState<WorkflowStepType>("email");
  const [stepConfig, setStepConfig] = useState<any>({});

  const handleStepTypeChange = (type: WorkflowStepType) => {
    setStepType(type);
    // Reset config when changing step type
    setStepConfig({});
  };

  const handleConfigChange = (config: any) => {
    setStepConfig(config);
  };

  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      id: uuidv4(), // Generate unique ID for the step
      type: stepType,
      config: stepConfig
    };
    onAddStep(newStep);
    onOpenChange(false);
    // Reset form
    setStepType("email");
    setStepConfig({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Workflow Step</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="step-type">Step Type</Label>
            <Select value={stepType} onValueChange={(value) => handleStepTypeChange(value as WorkflowStepType)}>
              <SelectTrigger id="step-type">
                <SelectValue placeholder="Select step type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Send Email</SelectItem>
                <SelectItem value="sms">Send SMS</SelectItem>
                <SelectItem value="task">Create Task</SelectItem>
                <SelectItem value="wait">Wait</SelectItem>
                <SelectItem value="condition">Simple Condition</SelectItem>
                <SelectItem value="template">Use Template</SelectItem>
                <SelectItem value="branch">Conditional Branch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <StepFormFields 
            type={stepType} 
            config={stepConfig} 
            onChange={handleConfigChange}
            allSteps={allSteps}
            currentStepIndex={allSteps.length}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAddStep}>Add Step</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStepForm;
