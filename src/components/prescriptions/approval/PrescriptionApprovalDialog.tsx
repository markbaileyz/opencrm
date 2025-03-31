
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertCircle, Clock, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ApprovalDecision {
  status: "approved" | "denied" | "pending_information" | "referred";
  notes: string;
}

interface PrescriptionApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescriptionData: {
    id: string;
    medicationName: string;
    dosage: string;
    prescribedBy: string;
  };
  onApprovalComplete?: (decision: ApprovalDecision) => void;
}

const PrescriptionApprovalDialog: React.FC<PrescriptionApprovalDialogProps> = ({
  open,
  onOpenChange,
  prescriptionData,
  onApprovalComplete,
}) => {
  const { toast } = useToast();
  const [decision, setDecision] = useState<"approved" | "denied" | "pending_information" | "referred">("approved");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!notes && (decision === "denied" || decision === "pending_information")) {
      toast({
        variant: "destructive",
        title: "Notes required",
        description: "Please provide notes explaining your decision.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here we would typically make an API call to update the prescription status
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      const decisionData: ApprovalDecision = {
        status: decision,
        notes: notes,
      };

      if (onApprovalComplete) {
        onApprovalComplete(decisionData);
      }

      toast({
        title: "Decision recorded",
        description: `Prescription has been ${decision}.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to record decision. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Prescription Approval</DialogTitle>
          <DialogDescription>
            Review and approve or deny the prescription request.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <div className="font-medium">Medication</div>
            <div className="font-semibold text-lg">{prescriptionData.medicationName}</div>
          </div>
          
          <div className="grid gap-2">
            <div className="font-medium">Dosage</div>
            <div>{prescriptionData.dosage}</div>
          </div>
          
          <div className="grid gap-2">
            <div className="font-medium">Prescribed By</div>
            <div>{prescriptionData.prescribedBy}</div>
          </div>

          <div className="grid gap-2 pt-2">
            <div className="font-medium">Decision</div>
            <RadioGroup value={decision} onValueChange={(value) => setDecision(value as any)}>
              <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                <RadioGroupItem value="approved" id="approved" />
                <Label htmlFor="approved" className={cn("flex items-center gap-2 cursor-pointer", decision === "approved" && "font-medium")}>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Approve</span>
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">Recommended</Badge>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                <RadioGroupItem value="denied" id="denied" />
                <Label htmlFor="denied" className={cn("flex items-center gap-2 cursor-pointer", decision === "denied" && "font-medium")}>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span>Deny</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                <RadioGroupItem value="pending_information" id="pending_information" />
                <Label htmlFor="pending_information" className={cn("flex items-center gap-2 cursor-pointer", decision === "pending_information" && "font-medium")}>
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span>Request Additional Information</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                <RadioGroupItem value="referred" id="referred" />
                <Label htmlFor="referred" className={cn("flex items-center gap-2 cursor-pointer", decision === "referred" && "font-medium")}>
                  <User className="h-4 w-4 text-blue-600" />
                  <span>Refer to Another Provider</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes or comments about your decision..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
              required={decision === "denied" || decision === "pending_information"}
            />
            {(decision === "denied" || decision === "pending_information") && (
              <p className="text-sm text-muted-foreground">
                Notes are required when denying or requesting additional information.
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Decision"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionApprovalDialog;
