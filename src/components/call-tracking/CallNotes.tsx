
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { CallRecord } from "@/types/call";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotesEditor from "./notes/NotesEditor";
import FollowUpSection from "./notes/FollowUpSection";

interface CallNotesProps {
  call: CallRecord;
  onUpdate: (callId: string, updates: Partial<CallRecord>) => void;
  onScheduleFollowUp?: (callId: string, date: string) => void;
}

const CallNotes: React.FC<CallNotesProps> = ({ 
  call, 
  onUpdate,
  onScheduleFollowUp 
}) => {
  const { toast } = useToast();

  const handleSaveNotes = (notes: string) => {
    onUpdate(call.id, { notes });
    toast({
      title: "Notes saved",
      description: "Call notes have been updated successfully.",
    });
  };

  const handleScheduleFollowUp = (callId: string, date: string, notes: string) => {
    const followUp = {
      date: date,
      status: 'pending' as const,
      notes: notes
    };
    
    onUpdate(callId, { followUp });
    
    if (onScheduleFollowUp) {
      onScheduleFollowUp(callId, date);
    }
    
    toast({
      title: "Follow-up scheduled",
      description: "A follow-up call has been scheduled.",
    });
  };

  const handleFollowUpComplete = (callId: string) => {
    if (!call.followUp) return;
    
    const updatedFollowUp = {
      ...call.followUp,
      status: 'completed' as const
    };
    
    onUpdate(callId, { followUp: updatedFollowUp });
    toast({
      title: "Follow-up completed",
      description: "The follow-up has been marked as completed.",
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Notes & Follow-up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Notes Section */}
        <div className="space-y-2">
          <NotesEditor 
            initialNotes={call.notes || ""} 
            onSave={handleSaveNotes} 
          />
        </div>

        {/* Follow-up Section */}
        <div className="space-y-2 pt-2 border-t">
          <FollowUpSection
            call={call}
            onScheduleFollowUp={handleScheduleFollowUp}
            onCompleteFollowUp={handleFollowUpComplete}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CallNotes;
