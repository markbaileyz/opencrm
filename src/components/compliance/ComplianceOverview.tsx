
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileCheck, AlertTriangle, Clock } from "lucide-react";
import ComplianceMetricsCards from "./ComplianceMetricsCards";
import ComplianceTasksList from "./ComplianceTasksList";
import ComplianceAuditLog from "./ComplianceAuditLog";
import ComplianceReports from "./ComplianceReports";

const ComplianceOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compliance Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage compliance tasks, requirements, and documentation
          </p>
        </div>
      </div>

      <ComplianceMetricsCards />

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Compliance Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="audits" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Audit Log</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Risk Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Audit Schedule</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="m-0">
          <ComplianceTasksList />
        </TabsContent>

        <TabsContent value="audits" className="m-0">
          <ComplianceAuditLog />
        </TabsContent>

        <TabsContent value="reports" className="m-0">
          <ComplianceReports />
        </TabsContent>

        <TabsContent value="schedule" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Audit Schedule</CardTitle>
              <CardDescription>Upcoming and planned compliance audits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-10 text-muted-foreground">
                Audit scheduling feature coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceOverview;
