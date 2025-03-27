
import React from "react";
import { Calendar, Clock, DollarSign, Building } from "lucide-react";

interface DealMetadataProps {
  closeDate: Date;
  createdDate: Date;
  value: number;
  organizationName?: string;
}

const DealMetadata: React.FC<DealMetadataProps> = ({
  closeDate,
  createdDate,
  value,
  organizationName
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Close Date</span>
        </div>
        <p className="font-medium">{closeDate.toLocaleDateString()}</p>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>Created</span>
        </div>
        <p className="font-medium">{createdDate.toLocaleDateString()}</p>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="h-4 w-4 mr-2" />
          <span>Value</span>
        </div>
        <p className="font-medium">${value.toLocaleString()}</p>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Building className="h-4 w-4 mr-2" />
          <span>Organization</span>
        </div>
        <p className="font-medium">{organizationName || "N/A"}</p>
      </div>
    </div>
  );
};

export default DealMetadata;
