
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, List, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import CallList from "@/components/call-tracking/CallList";
import CallDetailsView from "@/components/call-tracking/CallDetailsView";
import CallForm from "@/components/call-tracking/CallForm";
import CallAnalyticsDashboard from "@/components/call-tracking/analytics/CallAnalyticsDashboard";
import { CallRecord } from "@/types/call";
import { useOfflineState } from "@/hooks/use-offline-state";
import OfflineBanner from "@/components/ui/offline-banner";

// Mock data for calls
const mockCalls: CallRecord[] = [
  {
    id: "call1",
    contactId: "contact1",
    contactName: "Sarah Johnson",
    organizationId: "org1",
    organizationName: "Regional Health Partners",
    direction: "inbound",
    status: "completed",
    date: "2023-07-15T14:30:00Z",
    duration: 320,
    notes: "Discussed upcoming appointment and insurance coverage.",
    tags: ["appointment", "insurance"],
    followUp: {
      status: "pending",
      date: "2023-07-18T14:30:00Z",
      notes: "Send insurance verification form."
    }
  },
  {
    id: "call2",
    contactId: "contact2",
    contactName: "Michael Chen",
    organizationId: "org2",
    organizationName: "Westside Medical Group",
    direction: "outbound",
    status: "completed",
    date: "2023-07-14T11:15:00Z",
    duration: 245,
    notes: "Called to coordinate referral process for new patients.",
    tags: ["referral", "process"],
    followUp: null
  },
  {
    id: "call3",
    contactId: "contact3",
    contactName: "Jessica Martinez",
    organizationId: "org3",
    organizationName: "Allied Healthcare Services",
    direction: "inbound",
    status: "missed",
    date: "2023-07-13T09:45:00Z",
    duration: 0,
    notes: "Missed call, left voicemail about partnership opportunity.",
    tags: ["partnership", "voicemail"],
    followUp: {
      status: "completed",
      date: "2023-07-14T10:30:00Z",
      notes: "Called back and discussed partnership details."
    }
  },
  {
    id: "call4",
    contactId: "contact4",
    contactName: "David Wilson",
    organizationId: "org4",
    organizationName: "City General Hospital",
    direction: "outbound",
    status: "completed",
    date: "2023-07-12T16:20:00Z",
    duration: 460,
    notes: "Lengthy discussion about new medical records integration.",
    tags: ["integration", "technical"],
    followUp: null
  },
  {
    id: "call5",
    contactId: "contact5",
    contactName: "Emily Taylor",
    organizationId: "org5",
    organizationName: "Sunrise Senior Living",
    direction: "inbound",
    status: "completed",
    date: "2023-07-11T13:10:00Z",
    duration: 190,
    notes: "Question about medication delivery schedule.",
    tags: ["medication", "delivery"],
    followUp: {
      status: "pending",
      date: "2023-07-17T13:00:00Z",
      notes: "Confirm updated delivery schedule."
    }
  }
];

const CallTracking = () => {
  const [calls, setCalls] = useState<CallRecord[]>(mockCalls);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [isAddingCall, setIsAddingCall] = useState(false);
  const [isEditingCall, setIsEditingCall] = useState(false);
  const [activeView, setActiveView] = useState<"list" | "analytics">("list");
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "quarter" | "year">("week");
  const { isOnline, pendingActions } = useOfflineState();
  
  const handleAddCall = () => {
    setIsAddingCall(true);
  };
  
  const handleSaveCall = (call: CallRecord) => {
    if (calls.some(c => c.id === call.id)) {
      // Update existing call
      setCalls(calls.map(c => (c.id === call.id ? call : c)));
    } else {
      // Add new call
      setCalls([...calls, { ...call, id: `call${calls.length + 1}` }]);
    }
    setIsAddingCall(false);
    setIsEditingCall(false);
  };
  
  const handleCancelAddEdit = () => {
    setIsAddingCall(false);
    setIsEditingCall(false);
  };
  
  const handleDeleteCall = (callId: string) => {
    setCalls(calls.filter(call => call.id !== callId));
    setSelectedCallId(null);
  };
  
  const handleEditCall = (callId: string) => {
    setSelectedCallId(callId);
    setIsEditingCall(true);
  };
  
  const handleScheduleFollowUp = (callId: string, date: string, notes: string) => {
    setCalls(
      calls.map(call => {
        if (call.id === callId) {
          return {
            ...call,
            followUp: {
              status: "pending",
              date,
              notes
            }
          };
        }
        return call;
      })
    );
  };
  
  const handleCompleteFollowUp = (callId: string) => {
    setCalls(
      calls.map(call => {
        if (call.id === callId && call.followUp) {
          return {
            ...call,
            followUp: {
              ...call.followUp,
              status: "completed"
            }
          };
        }
        return call;
      })
    );
  };
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range as "day" | "week" | "month" | "quarter" | "year");
  };
  
  const handleSelectCall = (callId: string) => {
    setSelectedCallId(callId);
    setIsEditingCall(false);
  };
  
  const handleBackToList = () => {
    setSelectedCallId(null);
    setIsEditingCall(false);
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Call Tracking</h1>
            <p className="text-muted-foreground">
              Manage and analyze your call history and interactions
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleAddCall}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Call
            </Button>
          </div>
        </div>
        
        {(!isOnline || pendingActions > 0) && (
          <div className="mb-6">
            <OfflineBanner isOnline={isOnline} pendingActions={pendingActions} />
          </div>
        )}
        
        <Tabs 
          value={activeView === "list" ? "list" : "analytics"} 
          onValueChange={(value) => setActiveView(value as "list" | "analytics")}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span>Call List</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
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
              <CallList
                calls={calls}
                onCallSelect={handleSelectCall}
                onDeleteCall={handleDeleteCall}
                onEditCall={handleEditCall}
              />
            )}
          </TabsContent>
          
          <TabsContent value="analytics">
            <CallAnalyticsDashboard 
              calls={calls} 
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </TabsContent>
        </Tabs>
        
        <CallForm
          isOpen={isAddingCall || isEditingCall}
          onClose={handleCancelAddEdit}
          onSave={handleSaveCall}
          initialData={
            isEditingCall && selectedCallId
              ? calls.find(call => call.id === selectedCallId) || null
              : null
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default CallTracking;
