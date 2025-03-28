import React from "react";
import DashboardMetrics from "./DashboardMetrics";
import DashboardGuidesSection from "../guides/DashboardGuidesSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardMetrics />
      
      {/* Add DashboardGuidesSection component */}
      <DashboardGuidesSection />
      
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Healthcare CRM</CardTitle>
          <CardDescription>
            Get an overview of your key metrics and recent activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the main dashboard content.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
