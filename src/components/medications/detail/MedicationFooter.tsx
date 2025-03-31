
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface MedicationFooterProps {
  onRefillRequest?: () => void;
}

const MedicationFooter: React.FC<MedicationFooterProps> = ({ onRefillRequest }) => {
  return (
    <CardFooter className="flex gap-2 pt-4 justify-end">
      <Button 
        variant="outline" 
        onClick={onRefillRequest}
      >
        Refill Request
      </Button>
      <Button>Manage Medication</Button>
    </CardFooter>
  );
};

export default MedicationFooter;
