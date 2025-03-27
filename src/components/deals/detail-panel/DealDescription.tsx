
import React from "react";
import { Badge } from "@/components/ui/badge";

interface DealDescriptionProps {
  description?: string;
  tags?: string[];
}

const DealDescription: React.FC<DealDescriptionProps> = ({
  description,
  tags
}) => {
  return (
    <>
      {description && (
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Description</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {description}
          </p>
        </div>
      )}
      
      {tags && tags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Tags</h4>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DealDescription;
