
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Interaction {
  medications: string[];
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
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
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
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
                <div 
                  key={index} 
                  className={`border p-3 rounded-md ${getSeverityColor(interaction.severity)}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">{interaction.medications.join(" + ")}</span>
                    <Badge variant="outline" className={getSeverityColor(interaction.severity)}>
                      {interaction.severity} severity
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{interaction.description}</p>
                  <p className="text-sm font-medium">Recommendation: {interaction.recommendation}</p>
                </div>
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
