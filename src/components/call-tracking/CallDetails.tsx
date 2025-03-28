
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CallRecord } from "@/types/call";
import { 
  Phone, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  FileText, 
  Edit,
  ExternalLink, 
  MessageSquare, 
  Building
} from "lucide-react";

interface CallDetailsProps {
  call: CallRecord;
  onBack: () => void;
  onEdit: () => void;
  onCreateFollowUp: () => void;
}

const CallDetails: React.FC<CallDetailsProps> = ({
  call,
  onBack,
  onEdit,
  onCreateFollowUp
}) => {
  const getCallTypeBadge = (type: string) => {
    switch (type) {
      case "incoming":
        return <Badge className="bg-green-500">Incoming</Badge>;
      case "outgoing":
        return <Badge className="bg-blue-500">Outgoing</Badge>;
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
      return `${remainingSeconds} seconds`;
    }
    
    return `${minutes} minutes ${remainingSeconds} seconds`;
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center mb-2">
          <Button size="sm" variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Call with {call.contactName}
            </CardTitle>
            <CardDescription className="mt-1">
              {getCallTypeBadge(call.type)}
              <span className="ml-2">{format(new Date(call.timestamp), 'MMMM d, yyyy \'at\' h:mm a')}</span>
            </CardDescription>
          </div>
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-start">
                  <User className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">{call.contactName}</div>
                    {call.contactRole && (
                      <div className="text-sm text-muted-foreground">{call.contactRole}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{call.phoneNumber}</span>
                </div>
                
                {call.organization && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{call.organization}</span>
                  </div>
                )}
                
                {call.patientName && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Patient: {call.patientName}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Call Details</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{format(new Date(call.timestamp), 'MMMM d, yyyy')}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{format(new Date(call.timestamp), 'h:mm a')}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Duration: {formatDuration(call.duration)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Purpose</h3>
              <p className="mt-1">{call.purpose || "No purpose specified"}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <div className="mt-1 bg-muted/50 p-3 rounded-md min-h-[100px]">
                {call.notes || "No notes recorded for this call."}
              </div>
            </div>
            
            {call.followUp && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Follow-up</h3>
                  <div className="mt-1">
                    <Badge variant="outline" className="mb-2">
                      {call.followUp.status === "pending" ? "Pending" : "Completed"}
                    </Badge>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{format(new Date(call.followUp.date), 'MMMM d, yyyy')}</span>
                    </div>
                    {call.followUp.notes && (
                      <p className="mt-1 text-sm">{call.followUp.notes}</p>
                    )}
                  </div>
                </div>
              </>
            )}
            
            {call.relatedRecords && call.relatedRecords.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Related Records</h3>
                  <div className="mt-1 space-y-2">
                    {call.relatedRecords.map((record, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{record.type}: {record.name}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>
          Close
        </Button>
        
        <Button onClick={onCreateFollowUp} className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-2" />
          Create Follow-up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CallDetails;
