
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Sample contraindication data (would come from API in a real application)
const MEDICATION_WARNINGS = {
  "Warfarin": {
    warnings: [
      "High risk of bleeding when taken with NSAIDs or aspirin",
      "Interacts with many foods containing vitamin K",
      "Multiple drug interactions including antibiotics and antifungals"
    ],
    severity: "high"
  },
  "Ciprofloxacin": {
    warnings: [
      "Can cause tendon damage, especially in elderly patients",
      "Interacts with antacids, iron, and calcium supplements",
      "May cause QT interval prolongation"
    ],
    severity: "medium"
  }
};

interface ContraindicationWarningProps {
  medication: string;
}

const ContraindicationWarning: React.FC<ContraindicationWarningProps> = ({
  medication
}) => {
  // @ts-ignore - Accessing with string key
  const warningData = MEDICATION_WARNINGS[medication];
  
  if (!warningData) {
    return null;
  }
  
  return (
    <Alert variant={warningData.severity === "high" ? "destructive" : "warning"}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        Medication Warning
        {warningData.severity === "high" && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">High Risk</span>}
        {warningData.severity === "medium" && <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">Caution</span>}
      </AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {warningData.warnings.map((warning, index) => (
            <li key={index} className="text-sm">{warning}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm font-medium">
          Review patient history and current medications before prescribing.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default ContraindicationWarning;
