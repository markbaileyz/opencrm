
import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types/patient";
import { Edit, Trash, User } from "lucide-react";

interface PatientHeaderProps {
  patient: Patient;
  onEdit: () => void;
  onDelete: () => void;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({
  patient,
  onEdit,
  onDelete
}) => {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <CardTitle className="text-2xl">
          {patient.firstName} {patient.lastName}
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>#{patient.id}</span>
          <Badge variant={patient.status === "active" ? "default" : "secondary"}>
            {patient.status}
          </Badge>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PatientHeader;
