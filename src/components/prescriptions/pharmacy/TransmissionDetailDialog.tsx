
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPharmacyById } from "@/data/pharmacyData";
import { prescriptionHistoryData } from "@/data/prescriptionData";
import { PrescriptionTransmission } from "@/types/pharmacy";
import { useToast } from "@/hooks/use-toast";

interface TransmissionDetailDialogProps {
  transmission: PrescriptionTransmission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransmissionDetailDialog: React.FC<TransmissionDetailDialogProps> = ({
  transmission,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  
  if (!transmission) {
    return null;
  }
  
  const pharmacy = getPharmacyById(transmission.pharmacyId);
  const prescription = prescriptionHistoryData.find(p => p.id.toString() === transmission.prescriptionId);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "filled": return "bg-green-50 text-green-700 border-green-200";
      case "processing": return "bg-blue-50 text-blue-700 border-blue-200";
      case "sent": return "bg-purple-50 text-purple-700 border-purple-200";
      case "received": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "error": return "bg-red-50 text-red-700 border-red-200";
      case "cancelled": return "bg-gray-50 text-gray-700 border-gray-200";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleResendTransmission = () => {
    toast({
      title: "Transmission Resent",
      description: `Prescription for ${prescription?.medication} has been resent to ${pharmacy?.name}.`
    });
    onOpenChange(false);
  };

  const handleCheckStatus = () => {
    toast({
      title: "Status Check Initiated",
      description: "The system is checking the current status with the pharmacy."
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Prescription Transmission Details</DialogTitle>
          <DialogDescription>
            Transmission for {prescription?.medication} to {pharmacy?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-3">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge 
              variant="outline" 
              className={`${getStatusBadgeClass(transmission.status)} text-base py-1 px-4`}
            >
              {transmission.status.toUpperCase()}
            </Badge>
          </div>
          
          {/* Prescription Information */}
          <div className="space-y-2">
            <h3 className="font-medium">Prescription Information</h3>
            <div className="bg-muted/50 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Medication:</span>
                <span className="font-medium">{prescription?.medication || "Unknown"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Patient:</span>
                <span>{prescription?.patientName || "Unknown"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prescriber:</span>
                <span>{prescription?.prescriber || "Unknown"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prescription ID:</span>
                <span>{transmission.prescriptionId}</span>
              </div>
            </div>
          </div>
          
          {/* Transmission Details */}
          <div className="space-y-2">
            <h3 className="font-medium">Transmission Timeline</h3>
            <div className="bg-muted/50 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sent:</span>
                <span>{formatDate(transmission.sentDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Received:</span>
                <span>{formatDate(transmission.receivedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Filled:</span>
                <span>{formatDate(transmission.filledDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Ready Date:</span>
                <span>{formatDate(transmission.estimatedReadyDate)}</span>
              </div>
              {transmission.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tracking Number:</span>
                  <span className="font-mono">{transmission.trackingNumber}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Error Details (if applicable) */}
          {transmission.errorDetails && (
            <div className="space-y-2">
              <h3 className="font-medium text-red-600">Error Details</h3>
              <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
                {transmission.errorDetails}
              </div>
            </div>
          )}
          
          {/* Notes (if applicable) */}
          {transmission.notes && (
            <div className="space-y-2">
              <h3 className="font-medium">Notes</h3>
              <div className="bg-muted/50 p-4 rounded-md">{transmission.notes}</div>
            </div>
          )}
          
          {/* Action Buttons */}
          <DialogFooter className="gap-2">
            {transmission.status === "error" || transmission.status === "pending" ? (
              <Button onClick={handleResendTransmission} variant="default">
                Resend Transmission
              </Button>
            ) : (
              <Button onClick={handleCheckStatus} variant="outline">
                Check Status
              </Button>
            )}
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransmissionDetailDialog;
