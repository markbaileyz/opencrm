
import React, { useState } from "react";
import { useGuide } from "@/contexts/GuideContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GuideStep } from "@/types/guide-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, ChevronDown, ChevronUp, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface GuideBuilderProps {
  onClose: () => void;
  editGuideId?: string;
}

const GuideBuilder: React.FC<GuideBuilderProps> = ({ onClose, editGuideId }) => {
  const { guides } = useGuide();
  const initialGuide = editGuideId ? guides.find(g => g.id === editGuideId) : null;

  const [guideName, setGuideName] = useState(initialGuide?.name || "");
  const [guideDescription, setGuideDescription] = useState(initialGuide?.description || "");
  const [guideCategory, setGuideCategory] = useState(initialGuide?.category || "workflows");
  const [steps, setSteps] = useState<GuideStep[]>(initialGuide?.steps || []);
  const [activeTab, setActiveTab] = useState("details");

  // Get unique categories from existing guides
  const categories = Array.from(new Set(guides.map(guide => guide.category)));

  const addStep = () => {
    const newStep: GuideStep = {
      id: `step-${steps.length + 1}`,
      title: "",
      content: "",
      position: "bottom"
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const updateStep = (index: number, field: keyof GuideStep, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const moveStep = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newSteps[index];
    newSteps[index] = newSteps[newIndex];
    newSteps[newIndex] = temp;
    setSteps(newSteps);
  };

  const handleSave = () => {
    // Validate inputs
    if (!guideName) {
      toast.error("Guide name is required");
      return;
    }

    if (steps.length === 0) {
      toast.error("Guide must have at least one step");
      return;
    }

    for (const step of steps) {
      if (!step.title || !step.content) {
        toast.error("All steps must have a title and content");
        return;
      }
    }

    // In a real app, you would save the guide to your backend
    toast.success(
      editGuideId ? "Guide updated successfully" : "Guide created successfully"
    );
    
    onClose();
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{editGuideId ? "Edit Guide" : "Create New Guide"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="details">Guide Details</TabsTrigger>
            <TabsTrigger value="steps">Guide Steps ({steps.length})</TabsTrigger>
            <TabsTrigger value="preview" disabled={steps.length === 0}>Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="space-y-4">
              <div>
                <Label htmlFor="guideName">Guide Name</Label>
                <Input
                  id="guideName"
                  value={guideName}
                  onChange={(e) => setGuideName(e.target.value)}
                  placeholder="Enter guide name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="guideDescription">Description</Label>
                <Textarea
                  id="guideDescription"
                  value={guideDescription}
                  onChange={(e) => setGuideDescription(e.target.value)}
                  placeholder="Enter guide description"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="guideCategory">Category</Label>
                <Select value={guideCategory} onValueChange={setGuideCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Add New Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="steps">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card key={index} className="p-4 relative">
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveStep(index, "up")}
                      disabled={index === 0}
                      className="h-7 w-7"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveStep(index, "down")}
                      disabled={index === steps.length - 1}
                      className="h-7 w-7"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStep(index)}
                      className="h-7 w-7 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3 mt-4">
                    <Badge variant="outline">Step {index + 1}</Badge>

                    <div>
                      <Label htmlFor={`stepTitle-${index}`}>Title</Label>
                      <Input
                        id={`stepTitle-${index}`}
                        value={step.title}
                        onChange={(e) =>
                          updateStep(index, "title", e.target.value)
                        }
                        placeholder="Step title"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`stepContent-${index}`}>Content</Label>
                      <Textarea
                        id={`stepContent-${index}`}
                        value={step.content}
                        onChange={(e) =>
                          updateStep(index, "content", e.target.value)
                        }
                        placeholder="Step content"
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`stepSelector-${index}`}>Element Selector (optional)</Label>
                      <Input
                        id={`stepSelector-${index}`}
                        value={step.elementSelector || ""}
                        onChange={(e) =>
                          updateStep(index, "elementSelector", e.target.value)
                        }
                        placeholder="#element-id or .class-name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`stepPosition-${index}`}>Tooltip Position</Label>
                      <Select
                        value={step.position || "bottom"}
                        onValueChange={(value) =>
                          updateStep(index, "position", value)
                        }
                      >
                        <SelectTrigger id={`stepPosition-${index}`} className="mt-1">
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
                </Card>
              ))}

              <Button onClick={addStep} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Step
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{guideName || "Guide Preview"}</CardTitle>
                  <p className="text-muted-foreground">{guideDescription}</p>
                  {guideCategory && (
                    <Badge className="mt-2 capitalize">{guideCategory}</Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">Steps:</h3>
                  <div className="space-y-2">
                    {steps.map((step, index) => (
                      <div key={index} className="border p-3 rounded-md">
                        <Badge variant="outline" className="mb-2">
                          Step {index + 1}
                        </Badge>
                        <h4 className="font-medium">{step.title || "Untitled Step"}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.content || "No content"}
                        </p>
                        {step.elementSelector && (
                          <p className="text-xs mt-2">
                            <span className="font-medium">Selector:</span> {step.elementSelector}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          {editGuideId ? "Update Guide" : "Create Guide"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuideBuilder;
