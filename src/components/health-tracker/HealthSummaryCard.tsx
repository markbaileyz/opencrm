
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";

const HealthSummaryCard: React.FC = () => {
  // Sample data - in a real app this would come from the user's health data
  const healthScoreData = {
    overall: 78,
    vitals: 82,
    nutrition: 65,
    activity: 72,
    sleep: 85
  };
  
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">Health Summary</CardTitle>
        </div>
        <CardDescription>Your overall health metrics and progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h4 className="font-medium">Overall Health Score</h4>
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+2%</span>
            </div>
          </div>
          <Progress value={healthScoreData.overall} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0</span>
            <span className="font-medium text-foreground">{healthScoreData.overall}/100</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Vitals</h4>
              <span className="text-sm font-medium">{healthScoreData.vitals}%</span>
            </div>
            <Progress value={healthScoreData.vitals} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Nutrition</h4>
              <div className="flex items-center gap-1 text-red-500">
                <TrendingDown className="h-3 w-3" />
                <span className="text-xs">-3%</span>
              </div>
            </div>
            <Progress value={healthScoreData.nutrition} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Activity</h4>
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">+5%</span>
              </div>
            </div>
            <Progress value={healthScoreData.activity} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Sleep</h4>
              <span className="text-sm font-medium">{healthScoreData.sleep}%</span>
            </div>
            <Progress value={healthScoreData.sleep} className="h-1.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSummaryCard;
