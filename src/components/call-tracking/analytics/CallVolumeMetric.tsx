
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ReactNode } from "react";

interface CallVolumeMetricProps {
  totalCalls: number;
  inboundCalls: number;
  outboundCalls: number;
  missedCalls: number;
  icon?: ReactNode;
}

const CallVolumeMetric: React.FC<CallVolumeMetricProps> = ({
  totalCalls,
  inboundCalls,
  outboundCalls,
  missedCalls,
  icon
}) => {
  // Calculate percentage of missed calls
  const missedPercentage = totalCalls > 0 ? Math.round((missedCalls / totalCalls) * 100) : 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          <span>Call Volume</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{totalCalls}</div>
          <div className="text-xs text-muted-foreground">
            {inboundCalls} in / {outboundCalls} out
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Missed calls</span>
            <span className="text-xs font-medium">{missedCalls} ({missedPercentage}%)</span>
          </div>
          <Progress 
            value={missedPercentage} 
            className={`h-1 ${missedPercentage > 20 ? "bg-red-100" : ""}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CallVolumeMetric;
