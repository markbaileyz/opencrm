
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import HealthTrackerDashboard from "@/components/health-tracker/HealthTrackerDashboard";
import HealthTrackerHeader from "@/components/health-tracker/HealthTrackerHeader";
import VitalsHistoryChart from "@/components/health-tracker/vitals/VitalsHistoryChart";
import MobileLayout from "@/components/layout/MobileLayout";
import { useIsMobile } from "@/hooks/use-mobile";

const HealthTracker = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const isMobile = useIsMobile();
  
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };
  
  const mobileNavigation = (
    <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="vitals">Vitals History</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
      </TabsList>
    </Tabs>
  );
  
  const content = (
    <div className="space-y-6">
      <HealthTrackerHeader timeRange={timeRange} setTimeRange={setTimeRange} />
      
      {isMobile ? (
        <TabsContent value={selectedTab} className="m-0">
          {selectedTab === "dashboard" && (
            <HealthTrackerDashboard timeRange={timeRange} />
          )}
          {selectedTab === "vitals" && (
            <VitalsHistoryChart />
          )}
          {selectedTab === "trends" && (
            <Card>
              <CardHeader>
                <CardTitle>Health Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Trends analysis will be available soon.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      ) : (
        <>
          <HealthTrackerDashboard timeRange={timeRange} />
          <VitalsHistoryChart />
        </>
      )}
    </div>
  );
  
  if (isMobile) {
    return (
      <MobileLayout 
        title="Health Tracker"
        navigationContent={mobileNavigation}
      >
        <div className="p-4">
          {content}
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        {content}
      </div>
    </DashboardLayout>
  );
};

export default HealthTracker;
