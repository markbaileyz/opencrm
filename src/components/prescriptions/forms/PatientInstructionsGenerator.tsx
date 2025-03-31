
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Wand2 } from "lucide-react";

interface PatientInstructionsGeneratorProps {
  medication: string;
  dosage: string;
  frequency: string;
  onGenerate: (instructions: string) => void;
}

const PatientInstructionsGenerator: React.FC<PatientInstructionsGeneratorProps> = ({
  medication,
  dosage,
  frequency,
  onGenerate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCommonInstructions = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      // This would be an API call in a real application
      let instructions = `Take ${dosage} of ${medication} ${frequency.toLowerCase()}.`;
      
      // Add common instructions based on frequency
      if (frequency.includes("daily")) {
        instructions += " Take at the same time(s) each day.";
      }
      
      if (frequency.includes("empty stomach")) {
        instructions += " Take this medication 30 minutes before eating.";
      }
      
      if (frequency.includes("with meals")) {
        instructions += " Take this medication with food to reduce stomach upset.";
      }
      
      if (frequency.includes("bedtime")) {
        instructions += " Take this medication right before going to bed.";
      }
      
      // Add medication-specific instructions
      if (medication === "Warfarin") {
        instructions += " Avoid foods high in Vitamin K while taking this medication. Report any unusual bleeding or bruising.";
      }
      
      if (medication === "Metformin") {
        instructions += " Take with meals to reduce stomach upset. Monitor your blood sugar regularly.";
      }
      
      if (medication === "Atorvastatin") {
        instructions += " Report any unexplained muscle pain, tenderness, or weakness.";
      }
      
      if (medication === "Levothyroxine") {
        instructions += " Take on an empty stomach, at least 30 minutes before eating. Take at the same time each day.";
      }
      
      // Add common warnings
      instructions += " Do not stop taking this medication without consulting your healthcare provider.";
      
      onGenerate(instructions);
      setIsGenerating(false);
    }, 1000);
  };

  const templates = [
    {
      name: "Standard Instructions",
      generate: () => {
        setIsGenerating(true);
        setTimeout(() => {
          const instructions = `Take ${dosage} of ${medication} ${frequency.toLowerCase()}. Do not stop taking this medication without consulting your healthcare provider.`;
          onGenerate(instructions);
          setIsGenerating(false);
        }, 500);
      }
    },
    {
      name: "Detailed Instructions",
      generate: generateCommonInstructions
    },
    {
      name: "With Side Effects",
      generate: () => {
        setIsGenerating(true);
        setTimeout(() => {
          let sideEffects = "Common side effects may include: ";
          
          // Medication-specific side effects
          if (medication === "Lisinopril") {
            sideEffects += "dry cough, dizziness, and headache.";
          } else if (medication === "Metformin") {
            sideEffects += "nausea, diarrhea, and stomach upset.";
          } else if (medication === "Atorvastatin") {
            sideEffects += "muscle pain, constipation, and gas.";
          } else {
            sideEffects += "headache, nausea, and dizziness.";
          }
          
          const instructions = `Take ${dosage} of ${medication} ${frequency.toLowerCase()}. ${sideEffects} Contact your doctor if you experience severe or persistent side effects.`;
          onGenerate(instructions);
          setIsGenerating(false);
        }, 500);
      }
    }
  ];

  const disabled = !medication || !dosage || !frequency;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={disabled}
        >
          <Wand2 className="h-3.5 w-3.5 mr-1" />
          Generate
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Generate Instructions</h3>
          <p className="text-xs text-muted-foreground">
            Choose a template to generate instructions based on the prescription details.
          </p>
          <div className="grid gap-2 mt-2">
            {templates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start"
                disabled={isGenerating || disabled}
                onClick={template.generate}
              >
                {template.name}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PatientInstructionsGenerator;
