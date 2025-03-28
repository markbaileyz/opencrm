
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, MoveUp, MoveDown } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { WorkflowStep } from "@/types/workflow";
import { getStepTitle } from "./utils";

interface StepCardProps {
  step: WorkflowStep;
  index: number;
  totalSteps: number;
  onMoveStep: (fromIndex: number, toIndex: number) => void;
  onRemoveStep: (index: number) => void;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  index,
  totalSteps,
  onMoveStep,
  onRemoveStep,
}) => {
  return (
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
            disabled={index === totalSteps - 1}
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
  );
};

export default StepCard;
