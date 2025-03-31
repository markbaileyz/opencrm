
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample medication database (would come from API in a real application)
const MEDICATIONS = [
  { id: "med1", name: "Lisinopril", commonDosages: ["10mg", "20mg", "40mg"], category: "ACE Inhibitor" },
  { id: "med2", name: "Metformin", commonDosages: ["500mg", "850mg", "1000mg"], category: "Antidiabetic" },
  { id: "med3", name: "Atorvastatin", commonDosages: ["10mg", "20mg", "40mg", "80mg"], category: "Statin" },
  { id: "med4", name: "Levothyroxine", commonDosages: ["25mcg", "50mcg", "75mcg", "100mcg"], category: "Thyroid" },
  { id: "med5", name: "Amlodipine", commonDosages: ["2.5mg", "5mg", "10mg"], category: "Calcium Channel Blocker" },
  { id: "med6", name: "Metoprolol", commonDosages: ["25mg", "50mg", "100mg"], category: "Beta Blocker" },
  { id: "med7", name: "Omeprazole", commonDosages: ["10mg", "20mg", "40mg"], category: "Proton Pump Inhibitor" },
  { id: "med8", name: "Losartan", commonDosages: ["25mg", "50mg", "100mg"], category: "ARB" },
  { id: "med9", name: "Gabapentin", commonDosages: ["100mg", "300mg", "400mg", "800mg"], category: "Anticonvulsant" },
  { id: "med10", name: "Sertraline", commonDosages: ["25mg", "50mg", "100mg"], category: "SSRI" },
  // Medications with known contraindications (for demo purposes)
  { id: "med11", name: "Warfarin", commonDosages: ["1mg", "2mg", "5mg"], category: "Anticoagulant", hasWarnings: true },
  { id: "med12", name: "Ciprofloxacin", commonDosages: ["250mg", "500mg", "750mg"], category: "Antibiotic", hasWarnings: true },
];

// Medications with known contraindications (for demo)
const CONTRAINDICATED_MEDS = ["Warfarin", "Ciprofloxacin"];

interface MedicationSelectionFieldProps {
  selectedMedication: string;
  setSelectedMedication: (medication: string) => void;
  setHasContraindications: (has: boolean) => void;
}

const MedicationSelectionField: React.FC<MedicationSelectionFieldProps> = ({
  selectedMedication,
  setSelectedMedication,
  setHasContraindications
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [recentMedications, setRecentMedications] = useState<string[]>(["Lisinopril", "Metformin"]);

  useEffect(() => {
    // Check if selected medication has contraindications
    if (CONTRAINDICATED_MEDS.includes(selectedMedication)) {
      setHasContraindications(true);
    } else {
      setHasContraindications(false);
    }
  }, [selectedMedication, setHasContraindications]);

  const handleSelect = (medication: string) => {
    setSelectedMedication(medication);
    
    // Add to recent medications if not already there
    if (!recentMedications.includes(medication)) {
      setRecentMedications(prev => [medication, ...prev].slice(0, 5));
    }
    
    setOpen(false);
  };

  const getMedicationDetails = (name: string) => {
    return MEDICATIONS.find(med => med.name === name);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="medication">Medication</Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedMedication || "Select medication..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput 
              placeholder="Search medications..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No medication found.</CommandEmpty>
            
            {recentMedications.length > 0 && searchValue === "" && (
              <CommandGroup heading="Recent">
                {recentMedications.map((medication) => (
                  <CommandItem
                    key={medication}
                    value={medication}
                    onSelect={() => handleSelect(medication)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedMedication === medication ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span>{medication}</span>
                    {CONTRAINDICATED_MEDS.includes(medication) && (
                      <AlertCircle className="ml-auto h-4 w-4 text-amber-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            <CommandGroup heading="All Medications">
              {MEDICATIONS.filter(med => 
                searchValue === "" || med.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((medication) => (
                <CommandItem
                  key={medication.id}
                  value={medication.name}
                  onSelect={() => handleSelect(medication.name)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMedication === medication.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{medication.name}</span>
                    <span className="text-xs text-muted-foreground">{medication.category}</span>
                  </div>
                  {medication.hasWarnings && (
                    <AlertCircle className="ml-auto h-4 w-4 text-amber-500" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedMedication && getMedicationDetails(selectedMedication) && (
        <div className="mt-2 text-sm text-muted-foreground">
          Category: {getMedicationDetails(selectedMedication)?.category}
        </div>
      )}
    </div>
  );
};

export default MedicationSelectionField;
