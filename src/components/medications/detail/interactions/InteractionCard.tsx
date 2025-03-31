
import React, { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface InteractionCardProps {
  medications: string[];
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
  mechanism?: string;
  evidence?: string;
}

const InteractionCard: React.FC<InteractionCardProps> = ({
  medications,
  severity,
  description,
  recommendation,
  mechanism = "Not specified",
  evidence = "No specific studies cited"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getSeverityIcon = () => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "low":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };
  
  const getSeverityColor = () => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50 dark:bg-red-900/20";
      case "medium":
        return "border-amber-200 bg-amber-50 dark:bg-amber-900/20";
      case "low":
        return "border-blue-200 bg-blue-50 dark:bg-blue-900/20";
      default:
        return "border-gray-200 bg-gray-50 dark:bg-gray-900/20";
    }
  };
  
  const getSeverityBadge = () => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High severity</Badge>;
      case "medium":
        return <Badge variant="warning">Medium severity</Badge>;
      case "low":
        return <Badge variant="primary">Low severity</Badge>;
      default:
        return <Badge variant="outline">Unknown severity</Badge>;
    }
  };

  return (
    <div className={`border rounded-md ${getSeverityColor()} overflow-hidden`}>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getSeverityIcon()}
            <h4 className="font-medium">{medications.join(" + ")}</h4>
            {getSeverityBadge()}
          </div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle details</span>
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
        
        <p className="text-sm mb-2">{description}</p>
        <p className="text-sm font-medium">Recommendation: {recommendation}</p>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="mt-2 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Mechanism:</span> {mechanism}
              </div>
              <div>
                <span className="font-medium">Evidence:</span> {evidence}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default InteractionCard;
