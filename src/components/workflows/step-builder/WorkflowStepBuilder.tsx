
import React, { useState } from "react";
import { WorkflowStep } from "@/types/workflow";
import StepCard from "./StepCard";
import AddStepForm from "./AddStepForm";

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
  return (
    <div className="space-y-4">
      {/* List of existing steps */}
      {steps.length > 0 && (
        <div className="space-y-3">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              totalSteps={steps.length}
              onMoveStep={onMoveStep}
              onRemoveStep={onRemoveStep}
            />
          ))}
        </div>
      )}

      {/* Add new step */}
      <AddStepForm onAddStep={onAddStep} />
    </div>
  );
};

export default WorkflowStepBuilder;
