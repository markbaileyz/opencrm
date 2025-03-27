
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, AlertCircle } from "lucide-react";

interface DealStageProgressProps {
  currentStage: string;
  totalStages: number;
  currentStageIndex: number;
  timeInStage: number; // in days
  averageTimeInStage: number; // in days
  isStuck?: boolean;
}

const DealStageProgress: React.FC<DealStageProgressProps> = ({
  currentStage,
  totalStages,
  currentStageIndex,
  timeInStage,
  averageTimeInStage,
  isStuck = false,
}) => {
  const progressPercentage = ((currentStageIndex + 1) / totalStages) * 100;
  
  // Determine if the deal is moving slower than average
  const isSlower = timeInStage > averageTimeInStage && !isStuck;
  
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{currentStage}</span>
          {isStuck ? (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>Stuck</span>
            </Badge>
          ) : isSlower ? (
            <Badge variant="outline" className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50">
              <TrendingUp className="h-3 w-3" />
              <span>Slower than average</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1 text-green-500 border-green-200 bg-green-50">
              <ArrowRight className="h-3 w-3" />
              <span>On track</span>
            </Badge>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          Stage {currentStageIndex + 1} of {totalStages}
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{timeInStage} days in current stage</span>
        <span>Avg: {averageTimeInStage} days</span>
      </div>
    </div>
  );
};

export default DealStageProgress;
