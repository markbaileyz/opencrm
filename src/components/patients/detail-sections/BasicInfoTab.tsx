import React from "react";
import { Patient } from "@/types/patient";
import { Phone, Mail, MapPin, Calendar, User, AlertTriangle } from "lucide-react";

interface BasicInfoTabProps {
  patient: Patient;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{patient.address}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">Demographics</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm text-muted-foreground">Date of Birth</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Gender</div>
              <div className="capitalize">{patient.gender}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <EmergencyContactSection patient={patient} />
        
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">Primary Care</h3>
          {patient.primaryCarePhysician ? (
            <div>{patient.primaryCarePhysician}</div>
          ) : (
            <div className="text-sm text-muted-foreground">No primary care physician on record</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Emergency Contact Section Component
interface EmergencyContactSectionProps {
  patient: Patient;
}

const EmergencyContactSection: React.FC<EmergencyContactSectionProps> = ({ patient }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm text-muted-foreground">Emergency Contact</h3>
      {patient.emergencyContact ? (
        <div className="space-y-2">
          <div>
            <span className="font-medium">{patient.emergencyContact.name}</span>
            <span className="text-sm text-muted-foreground ml-2">
              ({patient.emergencyContact.relationship})
            </span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{patient.emergencyContact.phone}</span>
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
          No emergency contact provided
        </div>
      )}
    </div>
  );
};

export default BasicInfoTab;
