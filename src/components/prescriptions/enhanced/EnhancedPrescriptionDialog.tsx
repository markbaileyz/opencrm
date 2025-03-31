
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PrescriptionCreationForm from "../forms/PrescriptionCreationForm";

interface EnhancedPrescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId?: string;
  patientName?: string;
  preselectedMedication?: string;
}

const EnhancedPrescriptionDialog: React.FC<EnhancedPrescriptionDialogProps> = ({
  open,
  onOpenChange,
  patientId,
  patientName,
  preselectedMedication
}) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };
  
  const handleCancel = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>New Prescription</DialogTitle>
        </DialogHeader>
        
        <PrescriptionCreationForm
          patientId={patientId}
          patientName={patientName}
          preselectedMedication={preselectedMedication}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedPrescriptionDialog;
