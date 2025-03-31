
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Phone } from "lucide-react";
import { CallRecord } from "@/types/call";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CallForm from "@/components/call-tracking/CallForm";
import CallList from "@/components/call-tracking/CallList";
import CallAnalyticsDashboard from "@/components/call-tracking/analytics/CallAnalyticsDashboard";

const CallTracking: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [callToEdit, setCallToEdit] = useState<CallRecord | null>(null);
  const [activeTab, setActiveTab] = useState("list");
  
  // Sample call data
  const [calls, setCalls] = useState<CallRecord[]>([
    {
      id: "1",
      name: "John Smith",
      phone: "(555) 123-4567",
      date: "2023-09-15T10:30:00Z",
      duration: 245,
      notes: "Discussed project timeline and next steps",
      type: "incoming"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      phone: "(555) 987-6543",
      date: "2023-09-14T14:15:00Z",
      duration: 356,
      notes: "Reviewed proposal and pricing options",
      type: "outgoing"
    },
    {
      id: "3",
      name: "Michael Brown",
      phone: "(555) 456-7890",
      date: "2023-09-14T09:00:00Z",
      duration: 0,
      notes: "Customer wasn't available, will try again tomorrow",
      type: "missed"
    },
    {
      id: "4",
      name: "Emily Davis",
      phone: "(555) 789-0123",
      date: "2023-09-13T16:45:00Z",
      duration: 178,
      notes: "Addressed support ticket #45678",
      type: "incoming"
    },
    {
      id: "5",
      name: "Robert Wilson",
      phone: "(555) 234-5678",
      date: "2023-09-13T11:20:00Z",
      duration: 412,
      notes: "Quarterly account review",
      type: "outgoing"
    }
  ]);
  
  const handleAddCall = () => {
    setCallToEdit(null);
    setIsFormOpen(true);
  };
  
  const handleEditCall = (id: string) => {
    const call = calls.find(c => c.id === id);
    if (call) {
      setCallToEdit(call);
      setIsFormOpen(true);
    }
  };
  
  const handleSaveCall = (call: CallRecord) => {
    if (callToEdit) {
      // Update existing call
      setCalls(prev => 
        prev.map(c => c.id === call.id ? call : c)
      );
    } else {
      // Add new call
      setCalls(prev => [
        {
          ...call,
          id: String(prev.length + 1),
          date: new Date().toISOString()
        },
        ...prev
      ]);
    }
    setIsFormOpen(false);
    setCallToEdit(null);
  };
  
  const handleDeleteCall = (id: string) => {
    setCalls(prev => prev.filter(call => call.id !== id));
  };
  
  const handleFollowUp = (id: string) => {
    // Logic for follow-up would go here
    console.log(`Following up on call ${id}`);
  };
  
  // Calculate metric values for analytics
  const totalCalls = calls.length;
  const inboundCalls = calls.filter(call => call.type === "incoming").length;
  const outboundCalls = calls.filter(call => call.type === "outgoing").length;
  const missedCalls = calls.filter(call => call.type === "missed").length;
  
  // Calculate average duration (excluding missed calls)
  const nonMissedCalls = calls.filter(call => call.type !== "missed");
  const totalDuration = nonMissedCalls.reduce((acc, call) => acc + call.duration, 0);
  const avgDuration = nonMissedCalls.length > 0 ? Math.round(totalDuration / nonMissedCalls.length) : 0;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Call Tracking</h1>
          <Button onClick={handleAddCall}>
            <Plus className="h-4 w-4 mr-2" />
            Add Call
          </Button>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call List
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 3v18h18" />
                <path d="M18 12V8" />
                <path d="M12 18v-8" />
                <path d="M6 18v-4" />
              </svg>
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <CallList 
              calls={calls}
              onEditCall={handleEditCall}
              onFollowUp={handleFollowUp}
              onDeleteCall={handleDeleteCall}
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <CallAnalyticsDashboard
              totalCalls={totalCalls}
              inboundCalls={inboundCalls}
              outboundCalls={outboundCalls}
              missedCalls={missedCalls}
              avgDuration={avgDuration}
              calls={calls}
            />
          </TabsContent>
        </Tabs>
        
        {isFormOpen && (
          <CallForm
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSave={handleSaveCall}
            initialData={callToEdit}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default CallTracking;
