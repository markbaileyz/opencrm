
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import InteractionCard from "./interactions/InteractionCard";
import InteractionEmpty from "./interactions/InteractionEmpty";
import InteractionHeader from "./interactions/InteractionHeader";
import InteractionDisclaimer from "./interactions/InteractionDisclaimer";

interface MedicationInteraction {
  medications: string[];
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
  mechanism?: string;
  evidence?: string;
}

interface MedicationInteractionsProps {
  medicationName: string;
  interactions: MedicationInteraction[];
}

const MedicationInteractions: React.FC<MedicationInteractionsProps> = ({
  medicationName,
  interactions
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredInteractions = searchTerm 
    ? interactions.filter(interaction => 
        interaction.medications.some(med => 
          med.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        interaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : interactions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Interactions</CardTitle>
        <CardDescription>
          Potential interactions with {medicationName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <InteractionHeader medicationName={medicationName} />
        
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medications or interactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredInteractions.length > 0 ? (
          <div className="space-y-3">
            {filteredInteractions.map((interaction, index) => (
              <InteractionCard
                key={index}
                medications={interaction.medications}
                severity={interaction.severity}
                description={interaction.description}
                recommendation={interaction.recommendation}
                mechanism={interaction.mechanism}
                evidence={interaction.evidence}
              />
            ))}
          </div>
        ) : (
          <InteractionEmpty />
        )}
        
        <InteractionDisclaimer />
      </CardContent>
    </Card>
  );
};

export default MedicationInteractions;
