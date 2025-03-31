
import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tooltip } from "@/components/ui/tooltip";

interface InteractionCardProps {
  interaction: {
    medication: string;
    severity: "low" | "medium" | "high";
    description: string;
    mechanism?: string;
    recommendation?: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

const InteractionCard: React.FC<InteractionCardProps> = ({ 
  interaction, 
  isExpanded, 
  onToggle 
}) => {
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
  
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={onToggle}
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
            <p className="text-sm text-muted-foreground text-left">
              {interaction.description.substring(0, 60)}...
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          {isExpanded ? "Less" : "More"}
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
  );
};

export default InteractionCard;
