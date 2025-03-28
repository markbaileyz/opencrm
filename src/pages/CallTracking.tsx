
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CallTrackingList from "@/components/calls/CallTrackingList";
import CallForm from "@/components/calls/CallForm";
import { CallRecord } from "@/types/callTracking";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, subDays, subWeeks } from "date-fns";
import { 
  Phone, 
  PhoneMissed, 
  Timer, 
  BarChart2, 
  Users,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - in a real app, this would come from an API
const mockCallRecords: CallRecord[] = [
  {
    id: "1",
    patientId: "P12345",
    direction: "inbound",
    status: "completed",
    priority: "normal",
    timestamp: format(subDays(new Date(), 1), "yyyy-MM-dd'T'10:30:00"),
    duration: 124,
    notes: "Patient called with questions about their medication schedule.",
    staffMember: "Dr. Sarah Johnson",
    tags: ["medication", "question"]
  },
  {
    id: "2",
    patientId: "P67890",
    direction: "outbound",
    status: "completed",
    priority: "normal",
    timestamp: format(subDays(new Date(), 2), "yyyy-MM-dd'T'14:15:00"),
    duration: 305,
    notes: "Called to confirm upcoming appointment. Patient confirmed they will attend.",
    staffMember: "Nurse Mike Reynolds",
    followUpRequired: true,
    followUpDate: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    tags: ["appointment", "confirmation"]
  },
  {
    id: "3",
    patientId: "P54321",
    direction: "inbound",
    status: "missed",
    priority: "urgent",
    timestamp: format(subDays(new Date(), 2), "yyyy-MM-dd'T'09:05:00"),
    tags: ["missed", "urgent"]
  },
  {
    id: "4",
    patientId: "P24680",
    direction: "outbound",
    status: "scheduled",
    priority: "follow-up",
    timestamp: format(addDays(new Date(), 1), "yyyy-MM-dd'T'11:00:00"),
    notes: "Scheduled follow-up call to discuss lab results.",
    staffMember: "Dr. James Wilson",
    tags: ["lab results", "follow-up"]
  },
  {
    id: "5",
    patientId: "P13579",
    direction: "inbound",
    status: "completed",
    priority: "normal",
    timestamp: format(new Date(), "yyyy-MM-dd'T'08:45:00"),
    duration: 178,
    notes: "Patient reporting new symptoms. Advised to come in for check-up tomorrow.",
    staffMember: "Dr. Emma Thompson",
    followUpRequired: true,
    followUpDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    tags: ["symptoms", "check-up"]
  }
];

const CallTracking: React.FC = () => {
  const [calls, setCalls] = useState<CallRecord[]>(mockCallRecords);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCall, setEditingCall] = useState<CallRecord | undefined>(undefined);
  const { toast } = useToast();

  const handleAddCall = () => {
    setEditingCall(undefined);
    setIsFormOpen(true);
  };

  const handleViewCall = (callId: string) => {
    const call = calls.find(c => c.id === callId);
    if (call) {
      setEditingCall(call);
      setIsFormOpen(true);
    }
  };

  const handleSaveCall = (callData: Partial<CallRecord>) => {
    if (callData.id) {
      // Update existing call
      setCalls(prevCalls => 
        prevCalls.map(call => 
          call.id === callData.id ? { ...call, ...callData } as CallRecord : call
        )
      );
      toast({
        title: "Call updated",
        description: "Call record has been updated successfully.",
      });
    } else {
      // Create new call
      const newCall: CallRecord = {
        id: `call-${Date.now()}`,
        ...callData as Omit<CallRecord, 'id'>
      } as CallRecord;
      
      setCalls(prevCalls => [newCall, ...prevCalls]);
      toast({
        title: "Call logged",
        description: "New call has been recorded successfully.",
      });
    }
  };

  // Calculate call statistics
  const totalCalls = calls.length;
  const inboundCalls = calls.filter(call => call.direction === "inbound").length;
  const outboundCalls = calls.filter(call => call.direction === "outbound").length;
  const missedCalls = calls.filter(call => call.status === "missed").length;
  const scheduledCalls = calls.filter(call => call.status === "scheduled").length;
  
  const completedCalls = calls.filter(call => call.status === "completed");
  const totalDuration = completedCalls.reduce((sum, call) => sum + (call.duration || 0), 0);
  const averageDuration = completedCalls.length > 0 
    ? Math.round(totalDuration / completedCalls.length) 
    : 0;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Call Tracking</h1>
          <p className="text-muted-foreground">
            Manage and track patient calls and follow-ups
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{totalCalls}</span>
                <Phone className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Missed Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{missedCalls}</span>
                <PhoneMissed className="h-5 w-5 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Call Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{formatDuration(averageDuration)}</span>
                <Timer className="h-5 w-5 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{scheduledCalls}</span>
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Calls</TabsTrigger>
            <TabsTrigger value="inbound">Inbound ({inboundCalls})</TabsTrigger>
            <TabsTrigger value="outbound">Outbound ({outboundCalls})</TabsTrigger>
            <TabsTrigger value="missed">Missed ({missedCalls})</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled ({scheduledCalls})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <CallTrackingList 
              calls={calls} 
              onAddCall={handleAddCall} 
              onViewCall={handleViewCall} 
            />
          </TabsContent>

          <TabsContent value="inbound">
            <CallTrackingList 
              calls={calls.filter(call => call.direction === "inbound")} 
              onAddCall={handleAddCall} 
              onViewCall={handleViewCall} 
            />
          </TabsContent>

          <TabsContent value="outbound">
            <CallTrackingList 
              calls={calls.filter(call => call.direction === "outbound")} 
              onAddCall={handleAddCall} 
              onViewCall={handleViewCall} 
            />
          </TabsContent>

          <TabsContent value="missed">
            <CallTrackingList 
              calls={calls.filter(call => call.status === "missed")} 
              onAddCall={handleAddCall} 
              onViewCall={handleViewCall} 
            />
          </TabsContent>

          <TabsContent value="scheduled">
            <CallTrackingList 
              calls={calls.filter(call => call.status === "scheduled")} 
              onAddCall={handleAddCall} 
              onViewCall={handleViewCall} 
            />
          </TabsContent>
        </Tabs>

        <CallForm 
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSave={handleSaveCall}
          initialData={editingCall}
        />
      </div>
    </DashboardLayout>
  );
};

export default CallTracking;
