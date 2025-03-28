
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CallRecord } from "@/types/call";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CallCategorizationProps {
  call: CallRecord;
  onUpdate: (callId: string, updates: Partial<CallRecord>) => void;
}

const CallCategorization: React.FC<CallCategorizationProps> = ({
  call,
  onUpdate
}) => {
  const { toast } = useToast();
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [purpose, setPurpose] = useState(call.purpose || "");
  
  const callPurposes = [
    "Information Request", 
    "Appointment Scheduling", 
    "Complaint", 
    "Follow-up", 
    "Billing Question", 
    "Technical Support",
    "Sales Inquiry",
    "Other"
  ];

  const handleAddTag = () => {
    if (!newTag.trim()) return;

    const tags = [...(call.tags || [])];
    
    if (!tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      onUpdate(call.id, { tags: updatedTags });
      toast({
        title: "Tag added",
        description: `Tag "${newTag}" has been added to this call.`,
      });
    }
    
    setNewTag("");
    setIsAddingTag(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const tags = [...(call.tags || [])];
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    onUpdate(call.id, { tags: updatedTags });
    
    toast({
      title: "Tag removed",
      description: `Tag "${tagToRemove}" has been removed from this call.`,
    });
  };

  const handlePurposeChange = (newPurpose: string) => {
    setPurpose(newPurpose);
    onUpdate(call.id, { purpose: newPurpose });
    
    toast({
      title: "Purpose updated",
      description: "Call purpose has been updated successfully.",
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Tag className="h-5 w-5 mr-2" />
          Call Categorization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Purpose Selection */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Purpose</h3>
          <Select value={purpose} onValueChange={handlePurposeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select call purpose" />
            </SelectTrigger>
            <SelectContent>
              {callPurposes.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Tags</h3>
            {!isAddingTag && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAddingTag(true)}
                className="h-7 px-2 flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Tag
              </Button>
            )}
          </div>
          
          {isAddingTag ? (
            <div className="flex items-center gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="New tag name"
                className="flex-1"
              />
              <Button size="sm" variant="ghost" onClick={handleAddTag} className="px-2 h-9">
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsAddingTag(false)} className="px-2 h-9">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {call.tags && call.tags.length > 0 ? (
                call.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="group"
                  >
                    {tag}
                    <X 
                      className="h-3 w-3 ml-1 opacity-60 group-hover:opacity-100 cursor-pointer" 
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground italic">No tags added</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CallCategorization;
