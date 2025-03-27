
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

interface DealDetailsHeaderProps {
  dealName: string;
  organizationName: string;
  stage: string;
  value: number;
  onBack: () => void;
  onEdit?: (dealId: string) => void;
  dealId: string;
  onDeleteClick: () => void;
}

const DealDetailsHeader: React.FC<DealDetailsHeaderProps> = ({
  dealName,
  organizationName,
  stage,
  value,
  onBack,
  onEdit,
  dealId,
  onDeleteClick
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Deals
        </Button>
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" onClick={() => onEdit(dealId)} className="gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
          <Button variant="outline" onClick={onDeleteClick} className="gap-1 text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{dealName}</h1>
        <div className="flex items-center gap-3 mt-1 text-muted-foreground">
          <span>{organizationName}</span>
          <span>•</span>
          <span>{stage}</span>
          <span>•</span>
          <span>${value.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default DealDetailsHeader;
