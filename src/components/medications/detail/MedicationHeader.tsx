
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface MedicationHeaderProps {
  medication: {
    name: string;
    type: string;
    refills?: number;
  };
  onClose: () => void;
}

const MedicationHeader: React.FC<MedicationHeaderProps> = ({ medication, onClose }) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-xl">{medication.name}</CardTitle>
        <CardDescription className="mt-1">
          <div className="flex items-center gap-2">
            <Badge variant={medication.type === "Prescription" ? "default" : "outline"}>
              {medication.type}
            </Badge>
            {medication.refills !== undefined && (
              <Badge variant="outline" className="border-green-500 text-green-700">
                {medication.refills} refills remaining
              </Badge>
            )}
          </div>
        </CardDescription>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </CardHeader>
  );
};

export default MedicationHeader;
