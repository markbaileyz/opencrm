
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CallRecord } from "@/types/call";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

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
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  
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
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Call Duration</h3>
                  <p className="text-sm">{formatDuration(call.duration)}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
              <div className="bg-muted/50 p-3 rounded-md min-h-[100px]">
                {call.notes || "No notes recorded for this call."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallDetailsView;
