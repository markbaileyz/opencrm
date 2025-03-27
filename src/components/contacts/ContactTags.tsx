
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactTagsProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  className?: string;
  readOnly?: boolean;
}

const ContactTags = ({
  tags,
  onAddTag,
  onRemoveTag,
  className,
  readOnly = false
}: ContactTagsProps) => {
  const [newTag, setNewTag] = useState("");
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {!readOnly && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Add a tag..."
              className="pl-8"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button 
            type="button" 
            size="sm" 
            onClick={handleAddTag}
            disabled={!newTag.trim()}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="flex items-center gap-1 py-1"
            >
              {tag}
              {!readOnly && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => onRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </Badge>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">
            {readOnly ? "No tags" : "Add tags to categorize this contact"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactTags;
