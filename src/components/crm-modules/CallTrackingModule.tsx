
import React from "react";
import { Card } from "@/components/ui/card";

const CallTrackingModule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Call Tracking</h2>
        <p className="text-muted-foreground">Track and manage your calls</p>
      </div>
      
      <Card className="p-6">
        <iframe 
          src="/call-tracking" 
          className="w-full h-[800px] border-none"
          title="Call Tracking" 
        />
      </Card>
    </div>
  );
};

export default CallTrackingModule;
