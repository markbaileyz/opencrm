
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { CallRecord } from "@/types/call";
import CallDetails from "@/components/call-tracking/CallDetails";
import FollowUpForm from "@/components/call-tracking/notes/FollowUpForm";

interface CallDetailsViewProps {
  callId: string;
  calls: CallRecord[];
  onBack: () => void;
  onDeleteCall: (callId: string) => void;
  onEditCall: (callId: string) => void;
  onScheduleFollowUp: (callId: string, date: string, notes: string) => void;
  onCompleteFollowUp: (callId: string) => void;
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
  
  const handleOpenFollowUp = () => {
    setIsFollowUpOpen(true);
  };
  
  const handleCloseFollowUp = () => {
    setIsFollowUpOpen(false);
  };
  
  const handleFollowUpSave = (date: string, notes: string) => {
    onScheduleFollowUp(callId, date, notes);
    setIsFollowUpOpen(false);
  };
  
  const isPending = call.followUp && call.followUp.status === "pending";
  
  return (
    <div>
      <CallDetails 
        call={call}
        onBack={onBack}
        onEdit={() => onEditCall(callId)}
        onCreateFollowUp={handleOpenFollowUp}
      />
      
      {isPending && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={() => onCompleteFollowUp(callId)}>
            Mark Follow-up as Completed
          </Button>
        </div>
      )}
      
      <FollowUpForm
        isOpen={isFollowUpOpen}
        onClose={handleCloseFollowUp}
        onSave={handleFollowUpSave}
        initialDate={call.followUp?.date ? new Date(call.followUp.date) : undefined}
        initialNotes={call.followUp?.notes}
      />
    </div>
  );
};

export default CallDetailsView;
