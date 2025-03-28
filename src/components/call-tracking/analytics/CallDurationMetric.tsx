
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CallDurationMetricProps {
  avgDuration: number;
  icon?: ReactNode;
}

const CallDurationMetric: React.FC<CallDurationMetricProps> = ({
  avgDuration,
  icon
}) => {
  // Format duration in minutes and seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Calculate trend indicator
  const getTrendIndicator = () => {
    // Usually this would be calculated comparing to previous periods
    // For this example, we'll use a mock value
    const previousAvg = avgDuration - Math.round(Math.random() * 40) + 20;
    const percentChange = previousAvg ? Math.round(((avgDuration - previousAvg) / previousAvg) * 100) : 0;
    
    if (percentChange > 5) {
      return { text: `+${percentChange}%`, class: "text-green-600" };
    } else if (percentChange < -5) {
      return { text: `${percentChange}%`, class: "text-red-600" };
    } else {
      return { text: "stable", class: "text-yellow-600" };
    }
  };
  
  const trend = getTrendIndicator();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          <span>Average Call Duration</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{formatDuration(avgDuration)}</div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className={trend.class}>{trend.text}</span> from previous period
        </p>
      </CardContent>
    </Card>
  );
};

export default CallDurationMetric;
