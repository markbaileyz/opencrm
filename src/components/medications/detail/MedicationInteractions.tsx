
import React, { useState } from "react";
import { AlertTriangle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tooltip } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface Interaction {
  medication: string;
  severity: "low" | "medium" | "high";
  description: string;
  mechanism?: string;
  recommendation?: string;
}

interface MedicationInteractionsProps {
  medicationName: string;
  interactions?: Interaction[];
}

const MedicationInteractions: React.FC<MedicationInteractionsProps> = ({ 
  medicationName,
  interactions 
}) => {
  const { toast } = useToast();
  const [expandedInteraction, setExpandedInteraction] = useState<string | null>(null);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "low":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const handlePrintInteractions = () => {
    toast({
      title: "Printing interactions",
      description: "The interactions report is being prepared for printing.",
    });
  };
  
  if (!interactions || interactions.length === 0) {
    return (
      <div className="text-center p-6 bg-muted/20 rounded-md">
        <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="font-medium">No known interactions</p>
        <p className="text-sm text-muted-foreground mt-1">
          No known interactions with other medications have been identified for this medication.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          The following medications may interact with {medicationName}:
        </p>
        <Button size="sm" variant="outline" onClick={handlePrintInteractions}>
          <FileText className="h-4 w-4 mr-2" />
          Print Report
        </Button>
      </div>
      
      <div className="space-y-4">
        {interactions.map((interaction, index) => (
          <Collapsible
            key={index}
            open={expandedInteraction === interaction.medication}
            onOpenChange={() => {
              if (expandedInteraction === interaction.medication) {
                setExpandedInteraction(null);
              } else {
                setExpandedInteraction(interaction.medication);
              }
            }}
            className="border rounded-md overflow-hidden"
          >
            <CollapsibleTrigger className="w-full p-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                {getSeverityIcon(interaction.severity)}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{interaction.medication}</p>
                    <Badge className={getSeverityColor(interaction.severity)}>
                      {interaction.severity} severity
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-left">{interaction.description.substring(0, 60)}...</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {expandedInteraction === interaction.medication ? "Less" : "More"}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="p-4 pt-2 border-t bg-muted/10">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Full Description</h4>
                  <p className="text-sm">{interaction.description}</p>
                </div>
                
                {interaction.mechanism && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Mechanism of Interaction</h4>
                    <p className="text-sm">{interaction.mechanism}</p>
                  </div>
                )}
                
                {interaction.recommendation && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Recommendations</h4>
                    <p className="text-sm">{interaction.recommendation}</p>
                  </div>
                )}
                
                <div className="pt-2">
                  <Tooltip content="Contact prescriber about this interaction">
                    <Button size="sm">
                      Contact Prescriber
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
        <p className="text-sm flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-blue-500" />
          <span className="text-blue-700 dark:text-blue-300">
            This list may not be comprehensive. Always consult with a healthcare provider.
          </span>
        </p>
      </div>
    </div>
  );
};

export default MedicationInteractions;
