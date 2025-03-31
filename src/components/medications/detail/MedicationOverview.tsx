
import React from "react";
import { Pill, Clock, Calendar, FileText } from "lucide-react";

interface MedicationOverviewProps {
  medication: {
    name: string;
    dosage: string;
    schedule: string;
    startDate?: string;
    endDate?: string;
    prescribedBy?: string;
    notes?: string;
    sideEffects?: string[];
  };
}

const MedicationOverview: React.FC<MedicationOverviewProps> = ({ medication }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start gap-2">
          <Pill className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Dosage</p>
            <p className="text-sm text-muted-foreground">{medication.dosage}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Schedule</p>
            <p className="text-sm text-muted-foreground">{medication.schedule}</p>
          </div>
        </div>
        {medication.startDate && (
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">{medication.startDate}</p>
            </div>
          </div>
        )}
        {medication.endDate && (
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">{medication.endDate}</p>
            </div>
          </div>
        )}
        {medication.prescribedBy && (
          <div className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Prescribed By</p>
              <p className="text-sm text-muted-foreground">{medication.prescribedBy}</p>
            </div>
          </div>
        )}
      </div>
      
      {medication.notes && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Notes</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{medication.notes}</p>
        </div>
      )}
      
      {medication.sideEffects && medication.sideEffects.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Possible Side Effects</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            {medication.sideEffects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicationOverview;
