
import React from "react";
import { CallRecord } from "@/types/call";
import CallForm from "@/components/call-tracking/CallForm";

interface CallLogFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (call: Omit<CallRecord, "id">) => void;
  initialData?: CallRecord;
  isEditing?: boolean;
}

const CallLogForm: React.FC<CallLogFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false
}) => {
  const handleSave = (callData: Partial<CallRecord>) => {
    // Add the required fields for a CallRecord
    const completedCall: Omit<CallRecord, "id"> = {
      ...callData,
      createdBy: callData.createdBy || "current-user",
      createdAt: callData.createdAt || new Date().toISOString(),
    } as Omit<CallRecord, "id">;
    
    onSave(completedCall);
  };
  
  return (
    <CallForm
      open={isOpen}
      onOpenChange={onClose}
      onSave={handleSave}
      initialData={initialData}
      title={isEditing ? "Edit Call" : "Log Call"}
    />
  );
};

export default CallLogForm;
