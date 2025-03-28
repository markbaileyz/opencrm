
import React, { useState, useEffect } from "react";
import { useGuide } from "@/contexts/GuideContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, MoveUp, MoveDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { GuideStep } from "@/types/guide-context";

interface GuideBuilderProps {
  onClose: () => void;
  editGuideId?: string;
}

const GuideBuilder: React.FC<GuideBuilderProps> = ({ onClose, editGuideId }) => {
  const { guides, addGuide, updateGuide } = useGuide();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState<GuideStep[]>([
    { id: crypto.randomUUID(), title: "", content: "" }
  ]);
  const [error, setError] = useState("");
  
  // Get unique categories from existing guides
  const existingCategories = Array.from(new Set(guides.map(g => g.category)));
  
  useEffect(() => {
    if (editGuideId) {
      const guideToEdit = guides.find(g => g.id === editGuideId);
      if (guideToEdit) {
        setName(guideToEdit.name);
        setDescription(guideToEdit.description);
        setCategory(guideToEdit.category);
        setSteps(guideToEdit.steps);
      }
    }
  }, [editGuideId, guides]);
  
  const handleStepChange = (index: number, field: keyof GuideStep, value: any) => {
    setSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, [field]: value } : step
    ));
  };
  
  const addStep = () => {
    setSteps(prev => [...prev, { id: crypto.randomUUID(), title: "", content: "" }]);
  };
  
  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(prev => prev.filter((_, i) => i !== index));
    }
  };
  
  const moveStepUp = (index: number) => {
    if (index > 0) {
      setSteps(prev => {
        const newSteps = [...prev];
        [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
        return newSteps;
      });
    }
  };
  
  const moveStepDown = (index: number) => {
    if (index < steps.length - 1) {
      setSteps(prev => {
        const newSteps = [...prev];
        [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
        return newSteps;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      setError("Guide name is required");
      return;
    }
    
    if (!category.trim()) {
      setError("Category is required");
      return;
    }
    
    // Validate steps
    for (let i = 0; i < steps.length; i++) {
      if (!steps[i].title.trim()) {
        setError(`Step ${i + 1} title is required`);
        return;
      }
      if (!steps[i].content.trim()) {
        setError(`Step ${i + 1} content is required`);
        return;
      }
    }
    
    setError("");
    
    if (editGuideId) {
      updateGuide({
        id: editGuideId,
        name,
        description,
        category,
        steps
      });
    } else {
      addGuide({
        name,
        description,
        category,
        steps
      });
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Guide Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
            placeholder="E.g., Getting Started with Dashboard"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-3"
            placeholder="Brief description of what users will learn"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <div className="col-span-3 flex gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {existingCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Dashboard">Dashboard</SelectItem>
                <SelectItem value="Patient Management">Patient Management</SelectItem>
                <SelectItem value="Health Tracking">Health Tracking</SelectItem>
                <SelectItem value="Reporting">Reporting</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="Settings">Settings</SelectItem>
              </SelectContent>
            </Select>
            
            {!existingCategories.includes(category) && category && (
              <div className="bg-primary/10 text-primary px-3 py-2 text-sm rounded flex items-center">
                <span>New category</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Guide Steps</h3>
          <Button type="button" variant="outline" size="sm" onClick={addStep}>
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={cn(
                "border rounded-md p-4 space-y-4",
                index === 0 ? "border-primary/50" : "border-border"
              )}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Step {index + 1}</h4>
                <div className="flex items-center gap-1">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => moveStepUp(index)}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => moveStepDown(index)}
                    disabled={index === steps.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeStep(index)}
                    disabled={steps.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`step-title-${index}`}>
                    Step Title
                  </Label>
                  <Input
                    id={`step-title-${index}`}
                    value={step.title}
                    onChange={(e) => handleStepChange(index, "title", e.target.value)}
                    className="mt-1"
                    placeholder="E.g., Navigate to Dashboard"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`step-content-${index}`}>
                    Step Content
                  </Label>
                  <Textarea
                    id={`step-content-${index}`}
                    value={step.content}
                    onChange={(e) => handleStepChange(index, "content", e.target.value)}
                    className="mt-1"
                    placeholder="Detailed instructions for this step"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor={`step-selector-${index}`}>
                    Target Element (Optional)
                  </Label>
                  <Input
                    id={`step-selector-${index}`}
                    value={step.elementSelector || ""}
                    onChange={(e) => handleStepChange(index, "elementSelector", e.target.value)}
                    className="mt-1"
                    placeholder="E.g., #dashboard-chart"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    CSS selector for the element to highlight
                  </p>
                </div>
                
                <div>
                  <Label htmlFor={`step-position-${index}`}>
                    Tooltip Position (Optional)
                  </Label>
                  <Select 
                    value={step.position || "bottom"} 
                    onValueChange={(value) => handleStepChange(index, "position", value)}
                  >
                    <SelectTrigger id={`step-position-${index}`}>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {editGuideId ? "Update Guide" : "Create Guide"}
        </Button>
      </div>
    </form>
  );
};

export default GuideBuilder;
