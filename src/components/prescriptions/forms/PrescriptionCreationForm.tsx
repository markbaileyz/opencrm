
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Check, ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import MedicationSelectionField from "./MedicationSelectionField";
import DosageOptionsField from "./DosageOptionsField";
import PatientInstructionsGenerator from "./PatientInstructionsGenerator";
import ContraindicationWarning from "./ContraindicationWarning";

interface PrescriptionCreationFormProps {
  patientId?: string;
  patientName?: string;
  preselectedMedication?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PrescriptionCreationForm: React.FC<PrescriptionCreationFormProps> = ({
  patientId,
  patientName,
  preselectedMedication,
  onSuccess,
  onCancel
}) => {
  const { toast } = useToast();
  const [selectedMedication, setSelectedMedication] = useState(preselectedMedication || "");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");
  const [hasContraindications, setHasContraindications] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateInstructions = (generatedInstructions: string) => {
    setInstructions(generatedInstructions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMedication || !dosage || !frequency || !duration) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "Prescription created",
        description: "The prescription has been created successfully",
        variant: "success"
      });
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create New Prescription</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {patientName && (
            <div className="bg-muted p-3 rounded-md flex items-center">
              <div>
                <p className="text-sm font-medium">Patient</p>
                <p className="text-lg">{patientName}</p>
              </div>
            </div>
          )}
          
          <MedicationSelectionField
            selectedMedication={selectedMedication}
            setSelectedMedication={setSelectedMedication}
            setHasContraindications={setHasContraindications}
          />
          
          {hasContraindications && (
            <ContraindicationWarning medication={selectedMedication} />
          )}
          
          <DosageOptionsField
            medication={selectedMedication}
            dosage={dosage}
            setDosage={setDosage}
            frequency={frequency}
            setFrequency={setFrequency}
            duration={duration}
            setDuration={setDuration}
          />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="instructions">Patient Instructions</Label>
              <PatientInstructionsGenerator
                medication={selectedMedication}
                dosage={dosage}
                frequency={frequency}
                onGenerate={handleGenerateInstructions}
              />
            </div>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter detailed instructions for the patient..."
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="refills">Number of Refills</Label>
              <Select defaultValue="0">
                <SelectTrigger id="refills">
                  <SelectValue placeholder="Select refills" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pharmacy">Preferred Pharmacy</Label>
              <Select>
                <SelectTrigger id="pharmacy">
                  <SelectValue placeholder="Select pharmacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walgreens">Walgreens</SelectItem>
                  <SelectItem value="cvs">CVS Pharmacy</SelectItem>
                  <SelectItem value="riteaid">Rite Aid</SelectItem>
                  <SelectItem value="walmart">Walmart Pharmacy</SelectItem>
                  <SelectItem value="kroger">Kroger Pharmacy</SelectItem>
                  <SelectItem value="other">Other (specify)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Prescriber Notes (not visible to patient)</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes or comments..."
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          <Button 
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>Create Prescription</>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PrescriptionCreationForm;
