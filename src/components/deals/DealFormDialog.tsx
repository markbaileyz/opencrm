
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DealForm from "./DealForm";
import { Deal } from "@/types/deal";

interface DealFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deal?: Deal;
  onSubmit: (formData: Partial<Deal>) => void;
}

const DealFormDialog: React.FC<DealFormDialogProps> = ({
  open,
  onOpenChange,
  deal,
  onSubmit,
}) => {
  const isEditMode = !!deal;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Deal" : "Create New Deal"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update the details of your existing deal." 
              : "Add a new deal to your pipeline. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>
        
        <DealForm 
          deal={deal} 
          onSubmit={onSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
        
      </DialogContent>
    </Dialog>
  );
};

export default DealFormDialog;
