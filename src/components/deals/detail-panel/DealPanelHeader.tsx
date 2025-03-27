
import React from "react";
import { Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface DealPanelHeaderProps {
  dealName: string;
  organizationName?: string;
  stage: string;
  value: number;
  probability: number;
}

const DealPanelHeader: React.FC<DealPanelHeaderProps> = ({
  dealName,
  organizationName,
  stage,
  value,
  probability
}) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{dealName}</h3>
        <div className="flex items-center gap-2 mt-1">
          {organizationName && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Building className="h-4 w-4 mr-1" />
              <span>{organizationName}</span>
            </div>
          )}
          <Badge variant="outline" className="font-normal">
            {stage}
          </Badge>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold">{formatCurrency(value)}</div>
        <div className="text-sm text-muted-foreground">{probability}% probability</div>
      </div>
    </div>
  );
};

export default DealPanelHeader;
