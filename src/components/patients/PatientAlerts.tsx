
import React from "react";
import { AlertCircle, Clock, FileText, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface PatientAlertsProps {
  patient: any;
  className?: string;
}

const PatientAlerts: React.FC<PatientAlertsProps> = ({ patient, className }) => {
  // Alerts are derived from patient data
  const alerts = [
    ...(patient.allergies?.length 
      ? [{ type: "allergies", title: "Allergies", description: patient.allergies.join(", ") }] 
      : []),
    ...(patient.medications?.length 
      ? [{ type: "medications", title: "Current Medications", description: `${patient.medications.length} active medications` }] 
      : []),
    ...(patient.flags?.length 
      ? patient.flags.map((flag: any) => ({ 
          type: "flag", 
          title: flag.type, 
          description: flag.description 
        }))
      : []),
  ];

  if (alerts.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {alerts.map((alert, index) => (
        <Alert 
          key={index}
          variant={alert.type === "flag" && alert.title.toLowerCase() === "critical" ? "destructive" : "default"}
        >
          {getAlertIcon(alert.type, alert.title)}
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

// Helper function to get appropriate icon for alert
const getAlertIcon = (type: string, title: string) => {
  switch (type) {
    case "allergies":
      return <ShieldAlert className="h-4 w-4" />;
    case "medications":
      return <FileText className="h-4 w-4" />;
    case "flag":
      if (title.toLowerCase() === "critical") {
        return <AlertCircle className="h-4 w-4" />;
      }
      return <Clock className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export default PatientAlerts;
