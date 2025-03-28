
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progressValue?: number;
  progressColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  progressValue = 0,
  progressColor = "hsl(var(--primary))"
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <span className="bg-primary/10 p-1.5 rounded-full">{icon}</span>
        </div>
        <div className="text-2xl font-bold mb-4">{value}</div>
        {progressValue !== undefined && (
          <>
            <Progress 
              value={progressValue} 
              className="h-1.5"
              indicatorStyle={{ backgroundColor: progressColor }}
            />
            <div className="mt-1 text-xs text-muted-foreground">
              {progressValue}% of target
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
