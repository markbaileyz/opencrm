
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CallRecord } from "@/types/call";
import FollowUpForm from "./FollowUpForm";
import FollowUpDetails from "./FollowUpDetails";

interface FollowUpSectionProps {
  call: CallRecord;
  onScheduleFollowUp: (callId: string, date: string, notes: string) => void;
  onCompleteFollowUp: (callId: string) => void;
}

const FollowUpSection: React.FC<FollowUpSectionProps> = ({
  call,
  onScheduleFollowUp,
  onCompleteFollowUp
}) => {
  const [isAddingFollowUp, setIsAddingFollowUp] = useState(false);

  const handleSaveFollowUp = (date: string, notes: string) => {
    onScheduleFollowUp(call.id, date, notes);
    setIsAddingFollowUp(false);
  };

  const handleCompleteFollowUp = () => {
    onCompleteFollowUp(call.id);
  };

  const handleCancelFollowUp = () => {
    setIsAddingFollowUp(false);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Follow-up</h3>
      
      {call.followUp ? (
        <FollowUpDetails
          date={call.followUp.date}
          status={call.followUp.status}
          notes={call.followUp.notes}
          onComplete={handleCompleteFollowUp}
        />
      ) : isAddingFollowUp ? (
        <FollowUpForm
          isOpen={isAddingFollowUp}
          onClose={() => setIsAddingFollowUp(false)}
          onSave={handleSaveFollowUp}
          onCancel={handleCancelFollowUp}
        />
      ) : (
        <div className="flex">
          <Button 
            variant="outline" 
            onClick={() => setIsAddingFollowUp(true)} 
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Schedule Follow-up
          </Button>
        </div>
      )}
    </div>
  );
};

export default FollowUpSection;
