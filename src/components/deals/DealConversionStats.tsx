
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StageConversion {
  fromStage: string;
  toStage: string;
  conversionRate: number;
  trend: "up" | "down" | "stable";
  change: number;
}

interface DealConversionStatsProps {
  stageConversions: StageConversion[];
  overallConversionRate: number;
  timeFrame: string;
}

const DealConversionStats: React.FC<DealConversionStatsProps> = ({
  stageConversions,
  overallConversionRate,
  timeFrame,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Conversion Rates ({timeFrame})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall lead to deal</span>
              <span className="text-sm font-medium">{overallConversionRate}%</span>
            </div>
            <Progress value={overallConversionRate} className="h-2" />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Stage-by-Stage Conversion</h4>
            <div className="space-y-3">
              {stageConversions.map((conversion, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {conversion.fromStage} <span className="text-muted-foreground">→</span> {conversion.toStage}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{conversion.conversionRate}%</span>
                      <span className={`text-xs flex items-center ${conversion.trend === "up" ? "text-green-500" : conversion.trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                        {conversion.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : conversion.trend === "down" ? (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        ) : null}
                        {conversion.change > 0 ? "+" : ""}{conversion.change}%
                      </span>
                    </div>
                  </div>
                  <Progress value={conversion.conversionRate} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealConversionStats;
