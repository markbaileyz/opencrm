
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DealForm from "./DealForm";

export interface DealFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const DealFormDialog: React.FC<DealFormDialogProps> = ({
  open,
  onOpenChange,
  onSubmit = () => {},
  initialData
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Deal" : "Create New Deal"}</DialogTitle>
        </DialogHeader>
        <DealForm 
          onSubmit={(data) => {
            onSubmit(data);
            onOpenChange(false);
          }}
          initialData={initialData}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DealFormDialog;
