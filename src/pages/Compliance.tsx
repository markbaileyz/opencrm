
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplianceAuditLog from "@/components/compliance/ComplianceAuditLog";
import ComplianceOverview from "@/components/compliance/ComplianceOverview";
import ComplianceTasksList from "@/components/compliance/ComplianceTasksList";

const Compliance = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Compliance</h1>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <ComplianceOverview />
          </TabsContent>
          
          <TabsContent value="tasks">
            <ComplianceTasksList />
          </TabsContent>
          
          <TabsContent value="audit">
            <ComplianceAuditLog />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Compliance;
