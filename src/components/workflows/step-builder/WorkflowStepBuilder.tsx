
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import StepCard from "./StepCard";
import AddStepForm from "./AddStepForm";
import { Workflow, WorkflowStep } from "@/types/workflow";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import StepFormFields from "./StepFormFields";
import { v4 as uuidv4 } from "uuid";

interface WorkflowStepBuilderProps {
  workflow: Workflow;
  onWorkflowChange: (workflow: Workflow) => void;
}

const WorkflowStepBuilder: React.FC<WorkflowStepBuilderProps> = ({
  workflow,
  onWorkflowChange
}) => {
  const [steps, setSteps] = useState<WorkflowStep[]>(workflow.steps || []);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);
  
  // Update parent when steps change
  useEffect(() => {
    onWorkflowChange({
      ...workflow,
      steps
    });
  }, [steps]);
  
  // Add a new step to the workflow
  const handleAddStep = (step: WorkflowStep) => {
    // Ensure the step has an ID
    if (!step.id) {
      step.id = uuidv4();
    }
    setSteps([...steps, step]);
  };
  
  // Update a step in the workflow
  const handleUpdateStep = (updatedConfig: any) => {
    if (editingStepIndex === null) return;
    
    const updatedSteps = [...steps];
    updatedSteps[editingStepIndex] = {
      ...updatedSteps[editingStepIndex],
      config: updatedConfig
    };
    
    setSteps(updatedSteps);
    setEditingStepIndex(null);
  };
  
  // Delete a step from the workflow
  const handleDeleteStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };
  
  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSteps(items);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Workflow Steps</CardTitle>
        </CardHeader>
        <CardContent>
          {steps.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No steps added to this workflow yet.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsAddingStep(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Step
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="steps">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {steps.map((step, index) => (
                        <Draggable 
                          key={step.id || index} 
                          draggableId={step.id || `step-${index}`} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <StepCard 
                                step={step}
                                index={index}
                                onEdit={() => setEditingStepIndex(index)}
                                onDelete={handleDeleteStep}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <div className="pt-4">
                <Button variant="outline" onClick={() => setIsAddingStep(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add Step Dialog */}
      <AddStepForm 
        open={isAddingStep}
        onOpenChange={setIsAddingStep}
        onAddStep={handleAddStep}
        allSteps={steps}
      />
      
      {/* Edit Step Dialog */}
      {editingStepIndex !== null && (
        <Dialog 
          open={editingStepIndex !== null} 
          onOpenChange={(open) => !open && setEditingStepIndex(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Step {editingStepIndex !== null ? editingStepIndex + 1 : ""}</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              {editingStepIndex !== null && (
                <StepFormFields 
                  type={steps[editingStepIndex].type}
                  config={steps[editingStepIndex].config}
                  onChange={(config) => {
                    // For real-time preview, don't use this for final update
                    const updatedSteps = [...steps];
                    updatedSteps[editingStepIndex] = {
                      ...updatedSteps[editingStepIndex],
                      config
                    };
                  }}
                  allSteps={steps}
                  currentStepIndex={editingStepIndex}
                />
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingStepIndex(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (editingStepIndex !== null) {
                    handleUpdateStep(steps[editingStepIndex].config);
                  }
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WorkflowStepBuilder;
