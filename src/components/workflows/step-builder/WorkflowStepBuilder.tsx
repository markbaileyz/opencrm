
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { WorkflowStep } from "@/types/workflow";
import StepCard from "./StepCard";
import AddStepForm from "./AddStepForm";

export interface WorkflowStepBuilderProps {
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
  const [isAddStepOpen, setIsAddStepOpen] = useState(false);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    setSelectedStepIndex(index === selectedStepIndex ? null : index);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Workflow Steps</h3>
        <Button size="sm" onClick={() => setIsAddStepOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Add Step
        </Button>
      </div>
      
      {steps.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No steps have been added to this workflow yet.</p>
            <Button onClick={() => setIsAddStepOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Your First Step
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.id || index}
              step={step}
              stepIndex={index}
              totalSteps={steps.length}
              onRemove={() => onRemoveStep(index)}
              onMoveUp={index > 0 ? () => onMoveStep(index, index - 1) : undefined}
              onMoveDown={index < steps.length - 1 ? () => onMoveStep(index, index + 1) : undefined}
              onClick={() => handleStepClick(index)}
            />
          ))}
        </div>
      )}
      
      <AddStepForm
        open={isAddStepOpen}
        onOpenChange={setIsAddStepOpen}
        onAddStep={onAddStep}
        allSteps={steps}
      />
    </div>
  );
};

export default WorkflowStepBuilder;
