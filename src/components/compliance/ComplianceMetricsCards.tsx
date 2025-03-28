
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, FileCheck, AlertTriangle, Clock } from "lucide-react";

const ComplianceMetricsCards: React.FC = () => {
  // Sample compliance data
  const complianceData = {
    overallComplianceScore: 87,
    pendingTasks: 12,
    highRiskFindings: 3,
    upcomingDeadlines: 5
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          <Shield className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{complianceData.overallComplianceScore}%</div>
          <Progress value={complianceData.overallComplianceScore} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {complianceData.overallComplianceScore >= 90 
              ? "Excellent compliance status"
              : complianceData.overallComplianceScore >= 75
                ? "Good compliance status"
                : "Needs improvement"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          <FileCheck className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{complianceData.pendingTasks}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {complianceData.pendingTasks} compliance tasks require attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Risk Findings</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{complianceData.highRiskFindings}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {complianceData.highRiskFindings} critical issues need to be addressed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{complianceData.upcomingDeadlines}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {complianceData.upcomingDeadlines} deadlines in the next 30 days
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceMetricsCards;
