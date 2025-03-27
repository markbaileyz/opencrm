
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OfficeLayout from "@/components/office/OfficeLayout";
import SupplyManagement from "@/components/office/SupplyManagement";
import TaskScheduler from "@/components/office/TaskScheduler";
import OfficeSettings from "@/components/office/OfficeSettings";

const OfficePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("layout");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Office Management</h1>
          <p className="text-muted-foreground">
            Manage your office layout, supplies, scheduled tasks, and settings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="layout">Office Layout</TabsTrigger>
            <TabsTrigger value="supplies">Supply Management</TabsTrigger>
            <TabsTrigger value="tasks">Scheduled Tasks</TabsTrigger>
            <TabsTrigger value="settings">Office Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="space-y-4">
            <OfficeLayout />
          </TabsContent>

          <TabsContent value="supplies" className="space-y-4">
            <SupplyManagement />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <TaskScheduler />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <OfficeSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default OfficePage;
