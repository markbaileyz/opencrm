import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CallTrackingList from "@/components/call-tracking/CallTrackingList";
import CallDetailsView from "@/components/call-tracking/CallDetailsView";
import CallLogForm from "@/components/call-tracking/CallLogForm";
import CallAnalyticsDashboard from "@/components/call-tracking/analytics/CallAnalyticsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CallRecord } from "@/types/call";
import { useToast } from "@/hooks/use-toast";

// Sample data - this would typically come from an API
const sampleCalls: CallRecord[] = [
  {
    id: "call-1",
    type: "incoming",
    contactName: "John Smith",
    phoneNumber: "(555) 123-4567",
    timestamp: new Date("2023-05-01T09:30:00").toISOString(),
    duration: 320, // in seconds
    purpose: "Appointment scheduling",
    notes: "Patient wanted to reschedule their appointment for next week",
    patientName: "John Smith",
    followUp: {
      date: "2023-05-03",
      status: "pending",
      notes: "Call to confirm appointment details"
    },
    createdBy: "admin",
    createdAt: "2023-05-01T09:30:00Z"
  },
  {
    id: "call-2",
    type: "outgoing",
    contactName: "Sarah Johnson",
    phoneNumber: "(555) 234-5678",
    timestamp: new Date("2023-05-01T11:15:00").toISOString(),
    duration: 180,
    purpose: "Prescription refill inquiry",
    notes: "Called to discuss prescription refill options",
    patientName: "Sarah Johnson",
    createdBy: "admin",
    createdAt: "2023-05-01T11:15:00Z"
  },
  {
    id: "call-3",
    type: "missed",
    contactName: "Michael Davis",
    phoneNumber: "(555) 345-6789",
    timestamp: new Date("2023-05-02T13:45:00").toISOString(),
    duration: 0,
    purpose: "Unknown",
    patientName: "Michael Davis",
    createdBy: "admin",
    createdAt: "2023-05-02T13:45:00Z"
  },
  {
    id: "call-4",
    type: "incoming",
    contactName: "Emma Wilson",
    phoneNumber: "(555) 456-7890",
    timestamp: new Date("2023-05-02T15:30:00").toISOString(),
    duration: 240,
    purpose: "Billing inquiry",
    notes: "Patient had questions about recent invoice",
    patientName: "Emma Wilson",
    createdBy: "admin",
    createdAt: "2023-05-02T15:30:00Z"
  },
  {
    id: "call-5",
    type: "outgoing",
    contactName: "Robert Brown",
    phoneNumber: "(555) 567-8901",
    timestamp: new Date("2023-05-03T10:00:00").toISOString(),
    duration: 420,
    purpose: "Test results discussion",
    notes: "Called to discuss recent lab results",
    patientName: "Robert Brown",
    followUp: {
      date: "2023-05-10",
      status: "pending",
      notes: "Schedule follow-up appointment based on test results"
    },
    createdBy: "admin",
    createdAt: "2023-05-03T10:00:00Z"
  },
  {
    id: "call-6",
    type: "scheduled",
    contactName: "Jennifer Lee",
    phoneNumber: "(555) 678-9012",
    timestamp: new Date("2023-05-05T14:00:00").toISOString(),
    duration: 0,
    purpose: "Initial consultation",
    notes: "Scheduled call for new patient consultation",
    patientName: "Jennifer Lee",
    createdBy: "admin",
    createdAt: "2023-05-03T10:30:00Z"
  }
];

const CallTracking = () => {
  const { toast } = useToast();
  const [calls, setCalls] = useState<CallRecord[]>(sampleCalls);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [isCreateCallOpen, setIsCreateCallOpen] = useState(false);
  const [isEditCallOpen, setIsEditCallOpen] = useState(false);
  const [callToEdit, setCallToEdit] = useState<CallRecord | null>(null);
  const [activeTab, setActiveTab] = useState<string>("list");

  const handleViewCallDetails = (callId: string) => {
    setSelectedCallId(callId);
  };

  const handleBackToList = () => {
    setSelectedCallId(null);
  };

  const handleCreateCall = () => {
    setIsCreateCallOpen(true);
  };

  const handleEditCall = (callId: string) => {
    const call = calls.find(c => c.id === callId);
    if (call) {
      setCallToEdit(call);
      setIsEditCallOpen(true);
    }
  };

  const handleDeleteCall = (callId: string) => {
    setCalls(prev => prev.filter(call => call.id !== callId));
    toast({
      title: "Call Deleted",
      description: "The call record has been deleted successfully",
    });
    
    if (selectedCallId === callId) {
      setSelectedCallId(null);
    }
  };

  const handleSaveCall = (call: Omit<CallRecord, "id">) => {
    const newCall: CallRecord = {
      ...call,
      id: `call-${Date.now()}`,
    };
    
    setCalls(prev => [newCall, ...prev]);
    setIsCreateCallOpen(false);
    
    toast({
      title: "Call Logged",
      description: "The call has been logged successfully",
    });
  };

  const handleUpdateCall = (updatedCall: CallRecord) => {
    setCalls(prev => prev.map(call => 
      call.id === updatedCall.id ? updatedCall : call
    ));
    
    setIsEditCallOpen(false);
    setCallToEdit(null);
    
    toast({
      title: "Call Updated",
      description: "The call record has been updated successfully",
    });
  };

  const handleScheduleFollowUp = (callId: string, date: string, notes: string) => {
    setCalls(prev => prev.map(call => 
      call.id === callId 
        ? { 
            ...call, 
            followUp: { 
              date, 
              notes, 
              status: "pending" 
            } 
          } 
        : call
    ));
    
    toast({
      title: "Follow-up Scheduled",
      description: "A follow-up has been scheduled successfully",
    });
  };

  const handleCompleteFollowUp = (callId: string) => {
    setCalls(prev => prev.map(call => 
      call.id === callId && call.followUp 
        ? { 
            ...call, 
            followUp: { 
              ...call.followUp, 
              status: "completed" 
            } 
          } 
        : call
    ));
    
    toast({
      title: "Follow-up Completed",
      description: "The follow-up has been marked as completed",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Call Log</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            {selectedCallId ? (
              <CallDetailsView
                callId={selectedCallId}
                calls={calls}
                onBack={handleBackToList}
                onDeleteCall={handleDeleteCall}
                onEditCall={handleEditCall}
                onScheduleFollowUp={handleScheduleFollowUp}
                onCompleteFollowUp={handleCompleteFollowUp}
              />
            ) : (
              <CallTrackingList
                calls={calls}
                onViewCallDetails={handleViewCallDetails}
                onCreateCall={handleCreateCall}
                onDeleteCall={handleDeleteCall}
                onEditCall={handleEditCall}
              />
            )}
          </TabsContent>
          
          <TabsContent value="analytics">
            <CallAnalyticsDashboard calls={calls} />
          </TabsContent>
        </Tabs>
        
        <CallLogForm
          isOpen={isCreateCallOpen}
          onClose={() => setIsCreateCallOpen(false)}
          onSave={handleSaveCall}
        />
        
        {callToEdit && (
          <CallLogForm
            isOpen={isEditCallOpen}
            onClose={() => {
              setIsEditCallOpen(false);
              setCallToEdit(null);
            }}
            onSave={(callData) => handleUpdateCall({ ...callData, id: callToEdit.id })}
            initialData={callToEdit}
            isEditing
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default CallTracking;
