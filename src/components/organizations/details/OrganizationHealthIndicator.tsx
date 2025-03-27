
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { HeartPulse, AlertCircle, CheckCircle, Zap } from "lucide-react";

interface OrganizationHealthIndicatorProps {
  organizationId: string;
}

const OrganizationHealthIndicator: React.FC<OrganizationHealthIndicatorProps> = ({ organizationId }) => {
  // Mock health data - in a real app this would come from an API
  const healthData = {
    score: 85,
    engagementLevel: 78,
    revenueGrowth: 12,
    activityScore: 92,
    riskLevel: "low"
  };

  // Define health indicator color based on score
  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getHealthIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "medium": return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "high": return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <HeartPulse className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="mt-4 border border-muted">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-primary" />
            Organization Health
          </h3>
          <div className="flex items-center gap-1">
            {getHealthIcon(healthData.riskLevel)}
            <span className="text-sm font-medium">
              {healthData.riskLevel.charAt(0).toUpperCase() + healthData.riskLevel.slice(1)} Risk
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Overall Health</span>
              <span className="text-sm font-medium">{healthData.score}%</span>
            </div>
            <Progress 
              value={healthData.score} 
              className="h-2"
              indicatorStyle={{
                background: getHealthColor(healthData.score)
              }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Engagement</span>
                <span className="text-xs font-medium">{healthData.engagementLevel}%</span>
              </div>
              <Progress 
                value={healthData.engagementLevel} 
                className="h-1.5"
                indicatorStyle={{
                  background: getHealthColor(healthData.engagementLevel)
                }}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Growth</span>
                <span className="text-xs font-medium">+{healthData.revenueGrowth}%</span>
              </div>
              <Progress 
                value={healthData.revenueGrowth * 5} // Scale for display
                className="h-1.5"
                indicatorStyle={{
                  background: healthData.revenueGrowth > 0 ? "bg-green-500" : "bg-red-500"
                }}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Activity</span>
                <span className="text-xs font-medium">{healthData.activityScore}%</span>
              </div>
              <Progress 
                value={healthData.activityScore} 
                className="h-1.5"
                indicatorStyle={{
                  background: getHealthColor(healthData.activityScore)
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationHealthIndicator;
