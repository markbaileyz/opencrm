
import React from "react";
import { Patient } from "@/types/patient";

interface MedicalTabProps {
  patient: Patient;
}

const MedicalTab: React.FC<MedicalTabProps> = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Medical Conditions</h3>
          {patient.medicalConditions && patient.medicalConditions.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.medicalConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground">No medical conditions recorded</div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Allergies</h3>
          {patient.allergies && patient.allergies.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.allergies.map((allergy, index) => (
                <li key={index}>{allergy}</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground">No allergies recorded</div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Medications</h3>
          {patient.medications && patient.medications.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.medications.map((medication, index) => (
                <li key={index}>{medication}</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground">No medications recorded</div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Notes</h3>
          {patient.notes ? (
            <p className="text-sm">{patient.notes}</p>
          ) : (
            <div className="text-sm text-muted-foreground">No notes available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalTab;
