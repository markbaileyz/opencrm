
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  progressValue?: number;
  progressColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  progressValue,
  progressColor
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{value}</div>
            {icon}
          </div>
          {progressValue !== undefined && (
            <Progress 
              value={progressValue} 
              className="h-2" 
              style={{
                background: "hsl(var(--secondary))",
                ...(progressColor ? { "--indicator-color": progressColor } as React.CSSProperties : {})
              }}
              indicatorStyle={{
                background: progressColor || 
                  (progressValue > 90 
                    ? "hsl(var(--success))" 
                    : progressValue > 70 
                      ? "hsl(var(--warning))" 
                      : "hsl(var(--destructive))")
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
