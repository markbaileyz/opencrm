
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { WorkflowStep, Workflow, WorkflowTrigger, WorkflowStatus } from "@/types/workflow";
import WorkflowStepBuilder from "./WorkflowStepBuilder";

interface WorkflowFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (workflow: Omit<Workflow, "id">) => void;
  initialData?: Workflow;
  title?: string;
}

const WorkflowFormDialog: React.FC<WorkflowFormDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  title = "Create Workflow"
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [trigger, setTrigger] = useState<WorkflowTrigger>(initialData?.trigger || "manual");
  const [status, setStatus] = useState<WorkflowStatus>(initialData?.status || "draft");
  const [steps, setSteps] = useState<WorkflowStep[]>(initialData?.steps || []);

  const handleSave = () => {
    const workflowData: Omit<Workflow, "id"> = {
      name,
      description,
      trigger,
      status,
      steps,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: initialData?.createdBy || "current-user",
    };
    
    onSave(workflowData);
    resetForm();
  };

  const resetForm = () => {
    if (!initialData) {
      setName("");
      setDescription("");
      setTrigger("manual");
      setStatus("draft");
      setSteps([]);
    }
  };

  const handleAddStep = (step: WorkflowStep) => {
    setSteps(prev => [...prev, step]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveStep = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= steps.length) return;
    
    const newSteps = [...steps];
    const step = newSteps.splice(fromIndex, 1)[0];
    newSteps.splice(toIndex, 0, step);
    setSteps(newSteps);
  };

  const isFormValid = name.trim().length > 0 && steps.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Create an automated workflow to streamline your processes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Workflow Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New Patient Onboarding"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this workflow does..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="trigger">Trigger</Label>
              <Select value={trigger} onValueChange={(value) => setTrigger(value as WorkflowTrigger)}>
                <SelectTrigger id="trigger">
                  <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Activation</SelectItem>
                  <SelectItem value="new_patient">New Patient Created</SelectItem>
                  <SelectItem value="appointment_scheduled">Appointment Scheduled</SelectItem>
                  <SelectItem value="appointment_completed">Appointment Completed</SelectItem>
                  <SelectItem value="form_submission">Form Submission</SelectItem>
                  <SelectItem value="scheduled">Scheduled (Time-based)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as WorkflowStatus)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-3">
            <Label>Workflow Steps</Label>
            <WorkflowStepBuilder
              steps={steps}
              onAddStep={handleAddStep}
              onRemoveStep={handleRemoveStep}
              onMoveStep={handleMoveStep}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid}>
            Save Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowFormDialog;
