
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrganizations } from "@/context/OrganizationsContext";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, PieChart as PieChartIcon } from "lucide-react";
import TypePieChart from "./charts/TypePieChart";
import SizeBarChart from "./charts/SizeBarChart";
import StatusOverview from "./charts/StatusOverview";

const OrganizationInsights = () => {
  const { organizations } = useOrganizations();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Organization Insights</CardTitle>
          <Badge variant="outline" className="ml-2">
            {organizations.length} Organizations
          </Badge>
        </div>
        <CardDescription>Overview of your partner organizations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Types</span>
            </TabsTrigger>
            <TabsTrigger value="sizes" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Sizes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <StatusOverview organizations={organizations} />
          </TabsContent>

          <TabsContent value="types">
            <TypePieChart organizations={organizations} />
          </TabsContent>

          <TabsContent value="sizes">
            <SizeBarChart organizations={organizations} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrganizationInsights;
