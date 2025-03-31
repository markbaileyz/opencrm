
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CallTrackingList from "@/components/calls/CallTrackingList";
import { CallRecord } from "@/types/call";
import { useToast } from "@/components/ui/use-toast";

// Sample call data - in a real app this would come from an API or context
const sampleCalls: CallRecord[] = [
  {
    id: "1",
    contactName: "John Smith",
    phoneNumber: "555-123-4567",
    timestamp: new Date().toISOString(),
    duration: 120,
    type: "incoming",
    purpose: "Appointment scheduling",
    patientName: "John Smith",
    notes: "Patient called to schedule a follow-up appointment"
  },
  {
    id: "2",
    contactName: "Sarah Johnson",
    phoneNumber: "555-987-6543",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    duration: 300,
    type: "outgoing",
    purpose: "Prescription refill",
    patientName: "Sarah Johnson",
    notes: "Called patient to inform about prescription ready for pickup"
  },
  {
    id: "3",
    contactName: "Michael Brown",
    phoneNumber: "555-456-7890",
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    duration: 0,
    type: "missed",
    patientName: "Michael Brown"
  }
];

const CallTracking = () => {
  const { toast } = useToast();
  const [calls, setCalls] = useState<CallRecord[]>(sampleCalls);

  const handleViewCallDetails = (callId: string) => {
    toast({
      title: "View Call Details",
      description: `Viewing details for call ID: ${callId}`,
    });
  };

  const handleCreateCall = () => {
    toast({
      title: "Log New Call",
      description: "Opening form to log a new call",
    });
  };

  const handleDeleteCall = (callId: string) => {
    toast({
      title: "Delete Call",
      description: `Call ID: ${callId} would be deleted`,
      variant: "destructive",
    });
    // In a real app, we would delete the call and update the state
  };

  const handleEditCall = (callId: string) => {
    toast({
      title: "Edit Call",
      description: `Editing call ID: ${callId}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <CallTrackingList 
          calls={calls}
          onViewCallDetails={handleViewCallDetails}
          onCreateCall={handleCreateCall}
          onDeleteCall={handleDeleteCall}
          onEditCall={handleEditCall}
        />
      </div>
    </DashboardLayout>
  );
};

export default CallTracking;
