
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Common medications for the filter
const COMMON_MEDICATIONS = [
  "Lisinopril",
  "Metformin",
  "Atorvastatin",
  "Amlodipine",
  "Metoprolol",
  "Levothyroxine",
  "Warfarin",
  "Hydrochlorothiazide",
  "Omeprazole",
  "Simvastatin",
];

// Common prescribers for the filter
const PRESCRIBERS = [
  "Dr. Sarah Johnson",
  "Dr. Michael Chen",
  "Dr. David Rodriguez",
  "Dr. Emily Wilson",
  "Dr. James Thompson",
];

interface PrescriptionHistoryFiltersProps {
  onSelectMedication: (medication: string | null) => void;
  selectedMedication: string | null;
}

const PrescriptionHistoryFilters: React.FC<PrescriptionHistoryFiltersProps> = ({
  onSelectMedication,
  selectedMedication,
}) => {
  const [selectedPrescriber, setSelectedPrescriber] = useState<string | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);

  const handleClearAll = () => {
    onSelectMedication(null);
    setSelectedPrescriber(null);
    setSelectedPharmacy(null);
  };

  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Advanced Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearAll}
            className="h-8 px-2 text-xs"
          >
            Clear All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="medication">Medication</Label>
            <Select 
              value={selectedMedication || ""} 
              onValueChange={(value) => onSelectMedication(value || null)}
            >
              <SelectTrigger id="medication">
                <SelectValue placeholder="Select medication" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Medications</SelectItem>
                {COMMON_MEDICATIONS.map((medication) => (
                  <SelectItem key={medication} value={medication}>
                    {medication}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prescriber">Prescriber</Label>
            <Select 
              value={selectedPrescriber || ""} 
              onValueChange={(value) => setSelectedPrescriber(value || null)}
            >
              <SelectTrigger id="prescriber">
                <SelectValue placeholder="Select prescriber" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Prescribers</SelectItem>
                {PRESCRIBERS.map((prescriber) => (
                  <SelectItem key={prescriber} value={prescriber}>
                    {prescriber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pharmacy">Pharmacy</Label>
            <Select 
              value={selectedPharmacy || ""} 
              onValueChange={(value) => setSelectedPharmacy(value || null)}
            >
              <SelectTrigger id="pharmacy">
                <SelectValue placeholder="Select pharmacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Pharmacies</SelectItem>
                <SelectItem value="cvs">CVS Pharmacy</SelectItem>
                <SelectItem value="walgreens">Walgreens</SelectItem>
                <SelectItem value="riteaid">Rite Aid</SelectItem>
                <SelectItem value="walmart">Walmart Pharmacy</SelectItem>
                <SelectItem value="kroger">Kroger Pharmacy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedMedication && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Med: {selectedMedication}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onSelectMedication(null)}
              />
            </Badge>
          )}
          {selectedPrescriber && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Dr: {selectedPrescriber.replace("Dr. ", "")}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedPrescriber(null)}
              />
            </Badge>
          )}
          {selectedPharmacy && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Pharmacy: {selectedPharmacy}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedPharmacy(null)}
              />
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionHistoryFilters;
