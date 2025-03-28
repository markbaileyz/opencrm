
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PhoneIncoming, PhoneOutgoing } from "lucide-react";

interface CallTypeDistributionProps {
  inboundPercentage: number;
  outboundPercentage: number;
}

const CallTypeDistribution: React.FC<CallTypeDistributionProps> = ({
  inboundPercentage,
  outboundPercentage
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Type Distribution</CardTitle>
        <CardDescription>Inbound vs. outbound calls</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex items-center gap-2 w-24">
              <PhoneIncoming className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Inbound</span>
            </div>
            <div className="w-full">
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-blue-500" 
                  style={{ width: `${inboundPercentage}%` }} 
                />
              </div>
            </div>
            <div className="w-12 text-right font-medium text-sm">
              {inboundPercentage}%
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center gap-2 w-24">
              <PhoneOutgoing className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Outbound</span>
            </div>
            <div className="w-full">
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-green-500" 
                  style={{ width: `${outboundPercentage}%` }} 
                />
              </div>
            </div>
            <div className="w-12 text-right font-medium text-sm">
              {outboundPercentage}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallTypeDistribution;
