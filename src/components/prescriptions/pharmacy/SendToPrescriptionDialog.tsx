
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Check, Send, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { pharmacies } from "@/data/pharmacyData";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SendToPrescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescriptionId: string;
  medicationName: string;
  patientName: string;
}

const SendToPrescriptionDialog: React.FC<SendToPrescriptionDialogProps> = ({
  open,
  onOpenChange,
  prescriptionId,
  medicationName,
  patientName,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPharmacyId, setSelectedPharmacyId] = useState("");
  const [communicationMethod, setCommunicationMethod] = useState<"electronic" | "fax" | "print">("electronic");
  const [patientPharmaciesShown, setPatientPharmaciesShown] = useState(true);
  
  // Mock patient preferred pharmacies
  const patientPreferredPharmacies = pharmacies.slice(0, 2);
  
  const filteredPharmacies = pharmacies.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPharmacy = selectedPharmacyId 
    ? pharmacies.find(p => p.id === selectedPharmacyId) 
    : undefined;
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPharmacyId) {
      toast({
        title: "Please select a pharmacy",
        description: "You must select a pharmacy to continue",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Prescription Sent Successfully",
        description: `The prescription for ${medicationName} has been sent to ${selectedPharmacy?.name}.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error Sending Prescription",
        description: "There was a problem sending the prescription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePharmacyList = () => {
    setPatientPharmaciesShown(!patientPharmaciesShown);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Send Prescription to Pharmacy</DialogTitle>
          <DialogDescription>
            Select a pharmacy to send the prescription for {medicationName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Patient info */}
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Patient:</span>
                <p className="font-medium">{patientName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Medication:</span>
                <p className="font-medium">{medicationName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Prescription ID:</span>
                <p className="font-medium">{prescriptionId}</p>
              </div>
            </div>
          </div>
          
          {/* Toggle between patient preferred and all pharmacies */}
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">
              {patientPharmaciesShown ? "Patient's Preferred Pharmacies" : "All Pharmacies"}
            </h4>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={togglePharmacyList}
            >
              {patientPharmaciesShown ? "Browse All Pharmacies" : "Show Patient Preferences"}
            </Button>
          </div>
          
          {patientPharmaciesShown ? (
            // Patient's preferred pharmacies
            <div className="space-y-3">
              {patientPreferredPharmacies.map((pharmacy) => (
                <div 
                  key={pharmacy.id}
                  className={`p-3 border rounded-md cursor-pointer ${
                    selectedPharmacyId === pharmacy.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedPharmacyId(pharmacy.id)}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{pharmacy.name}</p>
                      <p className="text-sm text-muted-foreground">{pharmacy.address}, {pharmacy.city}</p>
                      <p className="text-sm text-muted-foreground">{pharmacy.phone}</p>
                    </div>
                    {selectedPharmacyId === pharmacy.id && (
                      <Check className="text-primary h-5 w-5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // All pharmacies with search
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search pharmacies..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedPharmacyId} onValueChange={setSelectedPharmacyId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pharmacy" />
                </SelectTrigger>
                <SelectContent>
                  {filteredPharmacies.map((pharmacy) => (
                    <SelectItem key={pharmacy.id} value={pharmacy.id}>
                      {pharmacy.name} - {pharmacy.address}, {pharmacy.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {selectedPharmacy && !selectedPharmacy.isIntegrated && (
            <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Non-Integrated Pharmacy</AlertTitle>
              <AlertDescription>
                This pharmacy does not support direct electronic transmission. 
                You'll need to use fax or print the prescription.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Communication method selection */}
          <div className="space-y-2">
            <Label>Communication Method</Label>
            <RadioGroup 
              value={communicationMethod} 
              onValueChange={(value: "electronic" | "fax" | "print") => setCommunicationMethod(value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="electronic" 
                  id="electronic" 
                  disabled={selectedPharmacy && !selectedPharmacy.isIntegrated} 
                />
                <Label 
                  htmlFor="electronic" 
                  className={selectedPharmacy && !selectedPharmacy.isIntegrated ? "text-muted-foreground" : ""}
                >
                  Electronic Transmission (Fastest)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fax" id="fax" />
                <Label htmlFor="fax">Send via Fax</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="print" id="print" />
                <Label htmlFor="print">Print for Patient</Label>
              </div>
            </RadioGroup>
          </div>
          
          {communicationMethod === "electronic" && selectedPharmacy?.isIntegrated && (
            <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                The prescription will be sent electronically directly to the pharmacy system. 
                The patient will be notified when it's ready.
              </AlertDescription>
            </Alert>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !selectedPharmacyId} 
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting
                ? "Sending..."
                : communicationMethod === "electronic"
                ? "Send to Pharmacy"
                : communicationMethod === "fax"
                ? "Send via Fax"
                : "Print Prescription"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendToPrescriptionDialog;
