
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PrescriptionForm from "./PrescriptionForm";

interface PrescriptionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescriptionType?: "new" | "refill";
  medicationId?: string;
}

const PrescriptionFormDialog: React.FC<PrescriptionFormDialogProps> = ({
  open,
  onOpenChange,
  prescriptionType = "new",
  medicationId,
}) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{prescriptionType === "new" ? "New Prescription" : "Refill Prescription"}</DialogTitle>
          <DialogDescription>
            {prescriptionType === "new" 
              ? "Create a new prescription for a patient" 
              : "Request a refill for an existing prescription"}
          </DialogDescription>
        </DialogHeader>
        <PrescriptionForm 
          onSuccess={handleSuccess} 
          onCancel={handleCancel}
          prescriptionType={prescriptionType}
          medicationId={medicationId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionFormDialog;
