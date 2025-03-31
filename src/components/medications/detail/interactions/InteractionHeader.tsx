
import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface InteractionHeaderProps {
  medicationName: string;
}

const InteractionHeader: React.FC<InteractionHeaderProps> = ({ medicationName }) => {
  const { toast } = useToast();

  const handlePrintInteractions = () => {
    toast({
      title: "Printing interactions",
      description: "The interactions report is being prepared for printing.",
    });
  };

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">
        The following medications may interact with {medicationName}:
      </p>
      <Button size="sm" variant="outline" onClick={handlePrintInteractions}>
        <FileText className="h-4 w-4 mr-2" />
        Print Report
      </Button>
    </div>
  );
};

export default InteractionHeader;
