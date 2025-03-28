
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CallRecord } from "@/types/call";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import CallNotes from "./CallNotes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CallRecordingControls from "./CallRecordingControls";

interface CallDetailsViewProps {
  callId: string;
  calls: CallRecord[];
  onBack: () => void;
  onDeleteCall: (callId: string) => void;
  onEditCall: (callId: string) => void;
  onScheduleFollowUp?: (callId: string, date: string, notes: string) => void;
  onCompleteFollowUp?: (callId: string) => void;
}

const CallDetailsView: React.FC<CallDetailsViewProps> = ({
  callId,
  calls,
  onBack,
  onDeleteCall,
  onEditCall,
  onScheduleFollowUp,
  onCompleteFollowUp
}) => {
  const [activeTab, setActiveTab] = useState("details");
  
  const call = calls.find(c => c.id === callId);
  
  if (!call) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-medium mb-2">Call Not Found</h3>
        <p className="text-muted-foreground mb-4">The call record you're looking for doesn't exist.</p>
        <Button onClick={onBack}>Back to Call List</Button>
      </div>
    );
  }
  
  const getCallTypeBadge = (type: string) => {
    switch (type) {
      case "incoming":
        return <Badge className="bg-blue-500">Incoming</Badge>;
      case "outgoing":
        return <Badge className="bg-green-500">Outgoing</Badge>;
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds) return "N/A";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
      return `${remainingSeconds}s`;
    }
    
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const displayName = call.contactName || call.name;
  const displayPhone = call.phoneNumber || call.phone;
  const displayDate = call.timestamp || call.date;
  
  return (
    <div>
      <div className="flex items-center mb-4">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
        <div className="flex-grow"></div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => onEditCall(callId)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDeleteCall(callId)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{displayName}</h2>
              <div className="flex items-center mb-4">
                {getCallTypeBadge(call.type)}
                <span className="ml-2 text-muted-foreground">
                  {format(new Date(displayDate), 'MMMM d, yyyy \'at\' h:mm a')}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Contact Information</h3>
                  <p className="text-sm">{displayPhone}</p>
                  {call.organization && (
                    <p className="text-sm">{call.organization}</p>
                  )}
                  {call.contactRole && (
                    <p className="text-sm text-muted-foreground">{call.contactRole}</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Call Duration</h3>
                  <p className="text-sm">{formatDuration(call.duration)}</p>
                </div>
                
                {call.purpose && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Purpose</h3>
                    <p className="text-sm">{call.purpose}</p>
                  </div>
                )}
                
                {call.tags && call.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Tags</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {call.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Notes</TabsTrigger>
                  {call.recordingUrl && (
                    <TabsTrigger value="recording">Recording</TabsTrigger>
                  )}
                  {call.relatedRecords && call.relatedRecords.length > 0 && (
                    <TabsTrigger value="related">Related Records</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="details">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                  <div className="bg-muted/50 p-3 rounded-md min-h-[100px]">
                    {call.notes || "No notes recorded for this call."}
                  </div>
                  
                  {call.followUp && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Follow-up</h3>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant={call.followUp.status === "completed" ? "success" : "secondary"}>
                            {call.followUp.status === "completed" ? "Completed" : "Pending"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(call.followUp.date), 'MMMM d, yyyy')}
                          </span>
                        </div>
                        {call.followUp.notes && <p className="text-sm">{call.followUp.notes}</p>}
                        
                        {call.followUp.status === "pending" && onCompleteFollowUp && (
                          <Button 
                            size="sm" 
                            className="mt-2" 
                            onClick={() => onCompleteFollowUp(callId)}
                          >
                            Mark as Completed
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {call.recordingUrl && (
                  <TabsContent value="recording">
                    <CallRecordingControls 
                      call={call}
                      onUpdate={(updates) => console.log("Recording updated", updates)}
                    />
                  </TabsContent>
                )}
                
                {call.relatedRecords && call.relatedRecords.length > 0 && (
                  <TabsContent value="related">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Related Records</h3>
                    <div className="space-y-2">
                      {call.relatedRecords.map((record, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                          <div>
                            <span className="font-medium">{record.name}</span>
                            <p className="text-xs text-muted-foreground">{record.type}</p>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        {onScheduleFollowUp && (
          <CallNotes
            call={call}
            onUpdate={(id, updates) => console.log("Call updated", id, updates)}
            onScheduleFollowUp={onScheduleFollowUp}
          />
        )}
      </div>
    </div>
  );
};

export default CallDetailsView;
