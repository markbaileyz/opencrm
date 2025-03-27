
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import HealthTrackerHeader from "@/components/health-tracker/HealthTrackerHeader";
import VitalsTabContent from "@/components/health-tracker/VitalsTabContent";
import ActivityTabContent from "@/components/health-tracker/ActivityTabContent";
import SleepTabContent from "@/components/health-tracker/SleepTabContent";
import NutritionTabContent from "@/components/health-tracker/NutritionTabContent";

const HealthTrackerPage = () => {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <HealthTrackerHeader timeRange={timeRange} setTimeRange={setTimeRange} />

        <Tabs defaultValue="vitals">
          <TabsList>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vitals" className="space-y-4">
            <VitalsTabContent />
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <ActivityTabContent />
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-4">
            <SleepTabContent />
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-4">
            <NutritionTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HealthTrackerPage;
