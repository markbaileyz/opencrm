
import React, { useState } from "react";
import { X, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmailLabelsProps {
  labels: string[];
  allLabels: string[];
  onAddLabel: (label: string) => void;
  onRemoveLabel: (label: string) => void;
}

const EmailLabels: React.FC<EmailLabelsProps> = ({
  labels = [],
  allLabels = [],
  onAddLabel,
  onRemoveLabel,
}) => {
  const [newLabel, setNewLabel] = useState("");

  const handleAddLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      onAddLabel(newLabel.trim());
      setNewLabel("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLabel();
    }
  };

  // Filter out labels that are already applied
  const availableLabels = allLabels.filter(label => !labels.includes(label));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 mb-2">
        {labels.map(label => (
          <Badge key={label} variant="secondary" className="gap-1 h-6">
            <Tag className="h-3 w-3" />
            {label}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => onRemoveLabel(label)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            Add Label
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="start">
          <div className="space-y-2">
            <div className="flex gap-1">
              <Input
                placeholder="New label..."
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-8"
              />
              <Button size="sm" className="h-8" onClick={handleAddLabel}>
                Add
              </Button>
            </div>
            
            {availableLabels.length > 0 && (
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Existing labels:</p>
                <div className="flex flex-wrap gap-1">
                  {availableLabels.map(label => (
                    <Badge 
                      key={label} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => onAddLabel(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmailLabels;
