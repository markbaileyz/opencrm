
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import InteractionCard from "./detail/interactions/InteractionCard";

interface Interaction {
  medications: string[];
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
  mechanism?: string;
  evidence?: string;
}

interface MedicationInteractionsProps {
  currentMedications: string[];
  interactions: Interaction[];
}

const MedicationInteractions: React.FC<MedicationInteractionsProps> = ({ 
  currentMedications,
  interactions
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkComplete, setCheckComplete] = useState(false);
  
  const filteredInteractions = searchTerm 
    ? interactions.filter(interaction => 
        interaction.medications.some(med => 
          med.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        interaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : interactions;
  
  const handleCheck = () => {
    setCheckComplete(true);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Interactions</CardTitle>
        <CardDescription>
          Check for potential interactions between medications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 font-medium">Current Medications:</p>
          <div className="flex flex-wrap gap-2">
            {currentMedications.map((med, index) => (
              <Badge key={index} variant="outline">{med}</Badge>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medications or interactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {checkComplete ? (
          filteredInteractions.length > 0 ? (
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
            <div className="border border-green-200 bg-green-50 p-4 rounded-md flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">No interactions found</p>
                <p className="text-sm text-green-700">The current medications don't have any known interactions.</p>
              </div>
            </div>
          )
        ) : (
          <div className="p-8 border rounded-md text-center">
            <p className="text-muted-foreground mb-4">
              Click "Run Interaction Check" to analyze potential medication interactions
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCheck} 
          className="w-full"
          disabled={checkComplete && filteredInteractions.length === 0}
        >
          Run Interaction Check
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicationInteractions;
