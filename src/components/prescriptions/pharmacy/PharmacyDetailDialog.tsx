
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Network, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Pharmacy } from "@/types/pharmacy";
import { getIntegrationByPharmacyId } from "@/data/pharmacyData";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface PharmacyDetailDialogProps {
  pharmacy: Pharmacy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PharmacyDetailDialog: React.FC<PharmacyDetailDialogProps> = ({
  pharmacy,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  
  if (!pharmacy) {
    return null;
  }
  
  const integration = pharmacy.isIntegrated 
    ? getIntegrationByPharmacyId(pharmacy.id) 
    : undefined;
  
  const handleTestConnection = () => {
    toast({
      title: "Connection Test",
      description: integration?.status === "active" 
        ? "Successfully connected to pharmacy system." 
        : "Connection failed. Please check integration settings.",
    });
  };
  
  const handleRequestIntegration = () => {
    toast({
      title: "Integration Request Sent",
      description: `Integration request for ${pharmacy.name} has been submitted.`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{pharmacy.name}</DialogTitle>
          <DialogDescription>
            Pharmacy details and integration information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-3">
          {/* Pharmacy Info Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Pharmacy Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>
                  {pharmacy.address}, {pharmacy.city}, {pharmacy.state} {pharmacy.zipCode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{pharmacy.phone}</span>
              </div>
              {pharmacy.fax && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Fax: {pharmacy.fax}</span>
                </div>
              )}
              {pharmacy.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{pharmacy.email}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Integration Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Integration Status</h3>
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {pharmacy.isIntegrated ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Integrated</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Not Integrated</span>
                    </>
                  )}
                </div>
                {pharmacy.isIntegrated && integration && (
                  <Badge 
                    variant="outline" 
                    className={
                      integration.status === "active" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : integration.status === "pending"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                  </Badge>
                )}
              </div>
              
              {pharmacy.isIntegrated && integration && (
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Integration Provider:</span>
                    <span className="font-medium">{integration.provider}</span>
                  </div>
                  {integration.lastSyncDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Synced:</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(integration.lastSyncDate).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  {integration.errorMessage && (
                    <div className="mt-2 text-red-600">
                      Error: {integration.errorMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            {pharmacy.isIntegrated ? (
              <Button 
                variant="outline" 
                onClick={handleTestConnection}
                className="flex items-center gap-1"
              >
                <Network className="h-4 w-4 mr-1" />
                Test Connection
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleRequestIntegration}
                className="flex items-center gap-1"
              >
                <Network className="h-4 w-4 mr-1" />
                Request Integration
              </Button>
            )}
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PharmacyDetailDialog;
