
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample medication database (would come from API in a real application)
const MEDICATIONS = [
  { id: "med1", name: "Lisinopril", commonDosages: ["10mg", "20mg", "40mg"], frequencies: ["Once daily", "Twice daily"] },
  { id: "med2", name: "Metformin", commonDosages: ["500mg", "850mg", "1000mg"], frequencies: ["Once daily", "Twice daily", "Three times daily"] },
  { id: "med3", name: "Atorvastatin", commonDosages: ["10mg", "20mg", "40mg", "80mg"], frequencies: ["Once daily at bedtime"] },
  { id: "med4", name: "Levothyroxine", commonDosages: ["25mcg", "50mcg", "75mcg", "100mcg"], frequencies: ["Once daily on empty stomach"] },
  { id: "med5", name: "Amlodipine", commonDosages: ["2.5mg", "5mg", "10mg"], frequencies: ["Once daily"] },
  { id: "med6", name: "Metoprolol", commonDosages: ["25mg", "50mg", "100mg"], frequencies: ["Once daily", "Twice daily"] },
  { id: "med7", name: "Omeprazole", commonDosages: ["10mg", "20mg", "40mg"], frequencies: ["Once daily before breakfast"] },
  { id: "med8", name: "Losartan", commonDosages: ["25mg", "50mg", "100mg"], frequencies: ["Once daily", "Twice daily"] },
  { id: "med9", name: "Gabapentin", commonDosages: ["100mg", "300mg", "400mg", "800mg"], frequencies: ["Once daily", "Twice daily", "Three times daily"] },
  { id: "med10", name: "Sertraline", commonDosages: ["25mg", "50mg", "100mg"], frequencies: ["Once daily", "Once daily at bedtime"] },
  { id: "med11", name: "Warfarin", commonDosages: ["1mg", "2mg", "5mg"], frequencies: ["Once daily"] },
  { id: "med12", name: "Ciprofloxacin", commonDosages: ["250mg", "500mg", "750mg"], frequencies: ["Twice daily"] },
];

// Duration options
const DURATIONS = [
  "7 days",
  "14 days",
  "30 days",
  "60 days",
  "90 days",
  "6 months",
  "1 year",
  "Until discontinued"
];

// All frequency options
const ALL_FREQUENCIES = [
  "Once daily",
  "Twice daily",
  "Three times daily",
  "Four times daily",
  "Every morning",
  "Every evening",
  "Once daily at bedtime",
  "Once daily on empty stomach",
  "Before meals",
  "With meals",
  "After meals",
  "As needed",
  "Every 4 hours as needed",
  "Every 6 hours as needed",
  "Every 8 hours as needed"
];

interface DosageOptionsFieldProps {
  medication: string;
  dosage: string;
  setDosage: (value: string) => void;
  frequency: string;
  setFrequency: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
}

const DosageOptionsField: React.FC<DosageOptionsFieldProps> = ({
  medication,
  dosage,
  setDosage,
  frequency,
  setFrequency,
  duration,
  setDuration
}) => {
  const [commonDosages, setCommonDosages] = useState<string[]>([]);
  const [recommendedFrequencies, setRecommendedFrequencies] = useState<string[]>([]);
  const [customDosage, setCustomDosage] = useState("");
  const [isCustomDosage, setIsCustomDosage] = useState(false);

  // Update common dosages when medication changes
  useEffect(() => {
    if (medication) {
      const med = MEDICATIONS.find(m => m.name === medication);
      if (med) {
        setCommonDosages(med.commonDosages);
        setRecommendedFrequencies(med.frequencies);
        setDosage("");
        setFrequency("");
      } else {
        setCommonDosages([]);
        setRecommendedFrequencies([]);
      }
      setIsCustomDosage(false);
    }
  }, [medication, setDosage, setFrequency]);

  const handleDosageChange = (value: string) => {
    if (value === "custom") {
      setIsCustomDosage(true);
      setDosage(customDosage);
    } else {
      setIsCustomDosage(false);
      setDosage(value);
    }
  };

  const handleCustomDosageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDosage(e.target.value);
    if (isCustomDosage) {
      setDosage(e.target.value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage</Label>
          <Select 
            value={isCustomDosage ? "custom" : dosage} 
            onValueChange={handleDosageChange}
            disabled={!medication}
          >
            <SelectTrigger id="dosage">
              <SelectValue placeholder="Select dosage" />
            </SelectTrigger>
            <SelectContent>
              {commonDosages.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom dosage</SelectItem>
            </SelectContent>
          </Select>
          
          {isCustomDosage && (
            <Input
              className="mt-2"
              placeholder="Enter custom dosage (e.g., 15mg)"
              value={customDosage}
              onChange={handleCustomDosageChange}
            />
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select 
            value={frequency} 
            onValueChange={setFrequency}
            disabled={!medication}
          >
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {recommendedFrequencies.length > 0 && (
                <>
                  <p className="px-2 text-xs font-medium text-muted-foreground">
                    Recommended
                  </p>
                  {recommendedFrequencies.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                  
                  <p className="mt-2 px-2 text-xs font-medium text-muted-foreground">
                    Other Options
                  </p>
                </>
              )}
              
              {ALL_FREQUENCIES.filter(f => !recommendedFrequencies.includes(f)).map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Select 
            value={duration} 
            onValueChange={setDuration}
            disabled={!medication}
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DosageOptionsField;
