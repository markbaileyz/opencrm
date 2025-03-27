
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface DealStage {
  id: string;
  name: string;
  color: string;
  order: number;
}

const defaultStages: DealStage[] = [
  { id: "prospecting", name: "Prospecting", color: "#9333ea", order: 0 },
  { id: "qualification", name: "Qualification", color: "#06b6d4", order: 1 },
  { id: "proposal", name: "Proposal", color: "#2563eb", order: 2 },
  { id: "negotiation", name: "Negotiation", color: "#eab308", order: 3 },
  { id: "closed_won", name: "Closed Won", color: "#22c55e", order: 4 },
  { id: "closed_lost", name: "Closed Lost", color: "#ef4444", order: 5 },
];

const DealStagesManager: React.FC = () => {
  const [stages, setStages] = React.useState<DealStage[]>(defaultStages);
  const [editingStage, setEditingStage] = React.useState<DealStage | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [stageName, setStageName] = React.useState("");
  const [stageColor, setStageColor] = React.useState("#3b82f6");
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    setStages(updatedItems);
    
    toast({
      title: "Pipeline stages reordered",
      description: "The deal pipeline stages have been successfully reordered.",
    });
  };

  const handleAddStage = () => {
    if (!stageName.trim()) return;
    
    const newStage: DealStage = {
      id: `stage_${Date.now()}`,
      name: stageName,
      color: stageColor,
      order: stages.length,
    };
    
    setStages([...stages, newStage]);
    setStageName("");
    setStageColor("#3b82f6");
    setDialogOpen(false);
    
    toast({
      title: "Stage added",
      description: `New stage "${stageName}" has been added to your pipeline.`,
    });
  };

  const handleEditStage = () => {
    if (!editingStage || !stageName.trim()) return;
    
    const updatedStages = stages.map(stage => 
      stage.id === editingStage.id 
        ? { ...stage, name: stageName, color: stageColor }
        : stage
    );
    
    setStages(updatedStages);
    setEditingStage(null);
    setStageName("");
    setStageColor("#3b82f6");
    setDialogOpen(false);
    
    toast({
      title: "Stage updated",
      description: `Stage "${stageName}" has been updated successfully.`,
    });
  };

  const handleDeleteStage = (stageId: string) => {
    const updatedStages = stages
      .filter(stage => stage.id !== stageId)
      .map((stage, index) => ({
        ...stage,
        order: index
      }));
    
    setStages(updatedStages);
    
    toast({
      title: "Stage deleted",
      description: "The stage has been removed from your pipeline.",
      variant: "destructive",
    });
  };

  const openEditDialog = (stage: DealStage) => {
    setEditingStage(stage);
    setStageName(stage.name);
    setStageColor(stage.color);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingStage(null);
    setStageName("");
    setStageColor("#3b82f6");
    setDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Deal Pipeline Stages</CardTitle>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Stage
        </Button>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="stages">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {stages.map((stage, index) => (
                  <Draggable key={stage.id} draggableId={stage.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center justify-between p-3 border rounded-md bg-background"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab"
                          >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: stage.color }}
                          ></div>
                          <span>{stage.name}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(stage)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteStage(stage.id)}
                            disabled={stages.length <= 1}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingStage ? "Edit Stage" : "Add New Stage"}
              </DialogTitle>
              <DialogDescription>
                {editingStage
                  ? "Update the details for this pipeline stage."
                  : "Create a new stage for your deal pipeline."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Stage Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Discovery"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Stage Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="color"
                    type="color"
                    value={stageColor}
                    onChange={(e) => setStageColor(e.target.value)}
                    className="w-12 h-9 p-1"
                  />
                  <div className="flex-1">
                    <Input
                      value={stageColor}
                      onChange={(e) => setStageColor(e.target.value)}
                      placeholder="#HEX"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={editingStage ? handleEditStage : handleAddStage}>
                {editingStage ? "Update Stage" : "Add Stage"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DealStagesManager;
