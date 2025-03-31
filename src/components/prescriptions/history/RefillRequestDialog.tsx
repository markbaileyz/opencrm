
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RefillRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescriptionData: {
    id: string;
    medicationName: string;
    dosage: string;
    prescribedBy: string;
    pharmacy?: string;
  };
}

const RefillRequestDialog: React.FC<RefillRequestDialogProps> = ({
  open,
  onOpenChange,
  prescriptionData,
}) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>(prescriptionData.pharmacy || "");
  const [urgency, setUrgency] = useState("normal");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the request data
      console.log({
        prescriptionId: prescriptionData.id,
        medication: prescriptionData.medicationName,
        pharmacy: selectedPharmacy,
        urgency,
        notes,
        requestDate: new Date().toISOString(),
      });

      // Show success message
      toast({
        title: "Refill Request Submitted",
        description: `Your refill request for ${prescriptionData.medicationName} has been submitted.`,
      });

      // Close the dialog
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting refill request:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your refill request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Prescription Refill</DialogTitle>
          <DialogDescription>
            Complete the form below to request a refill for your medication.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="bg-muted/50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Medication</Label>
                <p className="font-medium">{prescriptionData.medicationName}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Dosage</Label>
                <p className="font-medium">{prescriptionData.dosage}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Prescribed By</Label>
                <p className="font-medium">{prescriptionData.prescribedBy}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Rx Number</Label>
                <p className="font-medium">{prescriptionData.id}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pharmacy">Preferred Pharmacy</Label>
            <Select
              value={selectedPharmacy}
              onValueChange={setSelectedPharmacy}
              required
            >
              <SelectTrigger id="pharmacy">
                <SelectValue placeholder="Select pharmacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Walgreens">Walgreens</SelectItem>
                <SelectItem value="CVS Pharmacy">CVS Pharmacy</SelectItem>
                <SelectItem value="Rite Aid">Rite Aid</SelectItem>
                <SelectItem value="Walmart Pharmacy">Walmart Pharmacy</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedPharmacy === "Other" && (
            <div className="space-y-2">
              <Label htmlFor="pharmacyName">Pharmacy Name</Label>
              <Input 
                id="pharmacyName"
                placeholder="Enter pharmacy name"
                required 
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency</Label>
            <Select
              value={urgency}
              onValueChange={setUrgency}
            >
              <SelectTrigger id="urgency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent (Need within 24 hours)</SelectItem>
                <SelectItem value="normal">Normal (Need within 3-5 days)</SelectItem>
                <SelectItem value="routine">Routine (Need within 7+ days)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea 
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information for your healthcare provider..."
              rows={3}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RefillRequestDialog;
