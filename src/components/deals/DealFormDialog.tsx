
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DealForm from "./DealForm";
import { Deal } from "@/types/deal";
import { useToast } from "@/hooks/use-toast";

interface DealFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deal?: Deal;
}

const DealFormDialog: React.FC<DealFormDialogProps> = ({
  open,
  onOpenChange,
  deal,
}) => {
  const { toast } = useToast();
  const isEditMode = !!deal;

  const handleSubmit = (formData: Partial<Deal>) => {
    // Here you would typically save the deal data to your API/state
    console.log("Deal form submitted:", formData);
    
    toast({
      title: `Deal ${isEditMode ? "updated" : "created"}`,
      description: `Successfully ${isEditMode ? "updated" : "created"} deal: ${formData.name}`,
    });
    
    onOpenChange(false);
  };

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
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
        
      </DialogContent>
    </Dialog>
  );
};

export default DealFormDialog;
