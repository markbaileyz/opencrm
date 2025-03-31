
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

const MedicationFooter: React.FC = () => {
  return (
    <CardFooter className="flex gap-2 pt-4 justify-end">
      <Button variant="outline">Refill Request</Button>
      <Button>Manage Medication</Button>
    </CardFooter>
  );
};

export default MedicationFooter;
