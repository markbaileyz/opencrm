
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const MedicationHistory: React.FC = () => {
  return (
    <ScrollArea className="h-[300px] rounded-md border p-4">
      <div className="space-y-6">
        <div className="border-l-2 border-l-blue-500 pl-4 relative">
          <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[-5px] top-1.5"></div>
          <p className="text-sm font-medium">Prescribed</p>
          <p className="text-xs text-muted-foreground">April 15, 2024</p>
          <p className="text-sm mt-1">Initial prescription by Dr. Sarah Johnson</p>
        </div>
        
        <div className="border-l-2 border-l-green-500 pl-4 relative">
          <div className="absolute w-2 h-2 rounded-full bg-green-500 left-[-5px] top-1.5"></div>
          <p className="text-sm font-medium">Dosage Adjusted</p>
          <p className="text-xs text-muted-foreground">May 3, 2024</p>
          <p className="text-sm mt-1">Dosage increased from 10mg to 20mg daily</p>
        </div>
        
        <div className="border-l-2 border-l-amber-500 pl-4 relative">
          <div className="absolute w-2 h-2 rounded-full bg-amber-500 left-[-5px] top-1.5"></div>
          <p className="text-sm font-medium">Refill Requested</p>
          <p className="text-xs text-muted-foreground">May 28, 2024</p>
          <p className="text-sm mt-1">Patient requested refill via online portal</p>
        </div>
        
        <div className="border-l-2 border-l-blue-500 pl-4 relative">
          <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[-5px] top-1.5"></div>
          <p className="text-sm font-medium">Refill Approved</p>
          <p className="text-xs text-muted-foreground">May 29, 2024</p>
          <p className="text-sm mt-1">Refill approved by Dr. Sarah Johnson</p>
        </div>
      </div>
    </ScrollArea>
  );
};

export default MedicationHistory;
