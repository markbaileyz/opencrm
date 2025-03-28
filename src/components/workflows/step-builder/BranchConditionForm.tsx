
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BranchCondition, ConditionOperator } from "@/types/workflow";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface BranchConditionFormProps {
  conditions: BranchCondition[];
  onUpdate: (conditions: BranchCondition[]) => void;
  availableSteps: { id: string; label: string }[];
  availableFields: { id: string; label: string }[];
}

const BranchConditionForm: React.FC<BranchConditionFormProps> = ({
  conditions,
  onUpdate,
  availableSteps,
  availableFields,
}) => {
  const conditionOperators: { value: ConditionOperator; label: string }[] = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "contains", label: "Contains" },
    { value: "not_contains", label: "Not Contains" },
    { value: "greater_than", label: "Greater Than" },
    { value: "less_than", label: "Less Than" },
    { value: "is_empty", label: "Is Empty" },
    { value: "is_not_empty", label: "Is Not Empty" },
    { value: "starts_with", label: "Starts With" },
    { value: "ends_with", label: "Ends With" },
  ];

  const addCondition = () => {
    const newCondition: BranchCondition = {
      id: uuidv4(),
      field: availableFields[0]?.id || "",
      operator: "equals",
      value: "",
      nextStepId: availableSteps[0]?.id || "",
    };
    onUpdate([...conditions, newCondition]);
  };

  const updateCondition = (index: number, field: keyof BranchCondition, value: string) => {
    const updatedConditions = [...conditions];
    updatedConditions[index] = {
      ...updatedConditions[index],
      [field]: value,
    };
    onUpdate(updatedConditions);
  };

  const removeCondition = (index: number) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    onUpdate(updatedConditions);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Conditional Branches</h3>
        <Button variant="outline" size="sm" onClick={addCondition}>
          <Plus className="h-4 w-4 mr-2" />
          Add Condition
        </Button>
      </div>

      {conditions.length === 0 ? (
        <div className="text-sm text-center py-4 text-muted-foreground border rounded-md">
          No conditions defined. Add a condition to create a branch.
        </div>
      ) : (
        <div className="space-y-3">
          {conditions.map((condition, index) => (
            <Card key={condition.id} className="relative">
              <CardHeader className="py-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm">Condition {index + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => removeCondition(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-2 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <Select
                    value={condition.field}
                    onValueChange={(value) => updateCondition(index, "field", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFields.map((field) => (
                        <SelectItem key={field.id} value={field.id}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={condition.operator}
                    onValueChange={(value) => updateCondition(index, "operator", value as ConditionOperator)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditionOperators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {condition.operator !== "is_empty" && condition.operator !== "is_not_empty" && (
                    <Input
                      placeholder="Value"
                      value={condition.value}
                      onChange={(e) => updateCondition(index, "value", e.target.value)}
                    />
                  )}
                </div>

                <div className="pt-2">
                  <Select
                    value={condition.nextStepId}
                    onValueChange={(value) => updateCondition(index, "nextStepId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="If true, go to..." />
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

                <Input
                  placeholder="Description (optional)"
                  value={condition.description || ""}
                  onChange={(e) => updateCondition(index, "description", e.target.value)}
                  className="text-sm text-muted-foreground"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BranchConditionForm;
