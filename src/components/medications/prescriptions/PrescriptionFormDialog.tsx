
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PrescriptionForm from "./PrescriptionForm";

interface PrescriptionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrescriptionFormDialog: React.FC<PrescriptionFormDialogProps> = ({
  open,
  onOpenChange,
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
          <DialogTitle>New Prescription</DialogTitle>
        </DialogHeader>
        <PrescriptionForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionFormDialog;
