
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BranchCondition, WorkflowStep } from "@/types/workflow";
import BranchConditionForm from "./BranchConditionForm";

interface BranchStepFormProps {
  config: any;
  onChange: (config: any) => void;
  allSteps: WorkflowStep[];
  currentStepIndex: number;
}

const BranchStepForm: React.FC<BranchStepFormProps> = ({
  config,
  onChange,
  allSteps,
  currentStepIndex,
}) => {
  const [conditions, setConditions] = useState<BranchCondition[]>(config.conditions || []);
  const [defaultBranchId, setDefaultBranchId] = useState<string>(config.defaultBranchId || "");

  // Generate available steps for the branch targets
  // Exclude the current step to prevent infinite loops
  const availableSteps = allSteps
    .filter((step, index) => index !== currentStepIndex)
    .map((step, index) => ({
      id: step.id,
      label: `Step ${index + 1}: ${step.type}`,
    }));

  // Add an "End Workflow" option
  availableSteps.push({
    id: "end",
    label: "End Workflow",
  });

  // Available fields to check in conditions
  const availableFields = [
    { id: "patient.name", label: "Patient Name" },
    { id: "patient.email", label: "Patient Email" },
    { id: "patient.age", label: "Patient Age" },
    { id: "appointment.date", label: "Appointment Date" },
    { id: "appointment.type", label: "Appointment Type" },
    { id: "form.status", label: "Form Status" },
    { id: "workflow.custom_data", label: "Custom Data" },
  ];

  useEffect(() => {
    // Update parent component when conditions change
    onChange({
      ...config,
      conditions,
      defaultBranchId,
    });
  }, [conditions, defaultBranchId]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Conditional Branch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <BranchConditionForm
              conditions={conditions}
              onUpdate={setConditions}
              availableSteps={availableSteps}
              availableFields={availableFields}
            />

            <div className="pt-4 border-t">
              <Label htmlFor="defaultBranch">Default Branch (If no conditions match)</Label>
              <Select value={defaultBranchId} onValueChange={setDefaultBranchId}>
                <SelectTrigger id="defaultBranch">
                  <SelectValue placeholder="Select default path" />
                </SelectTrigger>
                <SelectContent>
                  {availableSteps.map((step) => (
                    <SelectItem key={step.id} value={step.id}>
                      {step.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchStepForm;
