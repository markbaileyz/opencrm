
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Calendar } from "lucide-react";
import CheckInDialog from "./CheckInDialog";
import ScheduleDialog from "./ScheduleDialog";
import { PatientListItem } from "@/types/patientList";

// Sample patients data for demonstration
const samplePatients: PatientListItem[] = [
  {
    id: "1",
    name: "John Smith",
    dateOfBirth: "1980-05-15",
    gender: "male",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, Anytown, USA",
    insurance: {
      provider: "Blue Cross",
      policyNumber: "BC12345678",
      group: "Group-123"
    },
    status: "active",
    lastVisit: "2023-05-10"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    dateOfBirth: "1975-08-21",
    gender: "female",
    phone: "(555) 987-6543",
    email: "sarah.johnson@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    insurance: {
      provider: "Aetna",
      policyNumber: "AE87654321",
      group: "Group-456"
    },
    status: "active",
    lastVisit: "2023-04-22"
  },
  {
    id: "3",
    name: "Michael Davis",
    dateOfBirth: "1992-02-10",
    gender: "male",
    phone: "(555) 456-7890",
    email: "michael.davis@example.com",
    address: "789 Pine St, Nowhere, USA",
    insurance: {
      provider: "UnitedHealthcare",
      policyNumber: "UH24681357",
      group: "Group-789"
    },
    status: "active",
    lastVisit: "2023-06-01"
  }
];

const MobileHeader = () => {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Front Desk</h2>
        <p className="text-sm text-muted-foreground">
          Manage patient check-ins, appointments, and scheduling
        </p>
        <div className="flex gap-2">
          <Button className="w-full" onClick={() => setIsCheckInOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Check-In
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setIsScheduleOpen(true)}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      <CheckInDialog 
        open={isCheckInOpen} 
        onOpenChange={setIsCheckInOpen}
        patients={samplePatients}
      />

      <ScheduleDialog
        open={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
        patients={samplePatients}
      />
    </>
  );
};

export default MobileHeader;
