
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { OrganizationsProvider } from "@/context/OrganizationsContext";
import OrganizationsTable from "@/components/organizations/OrganizationsTable";
import OrganizationsFilters from "@/components/organizations/OrganizationsFilters";
import OrganizationFormDialog from "@/components/organizations/OrganizationFormDialog";
import OrganizationTypeChart from "@/components/organizations/OrganizationTypeChart";
import OrganizationSizeDistribution from "@/components/organizations/OrganizationSizeDistribution";
import OrganizationStatusCard from "@/components/organizations/OrganizationStatusCard";
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart3, Table2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Organizations = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"table" | "analytics">("table");

  const handleAddOrganization = () => {
    setSelectedOrganization(undefined);
    setFormOpen(true);
  };

  const handleEditOrganization = (organization: Organization) => {
    setSelectedOrganization(organization);
    setFormOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setSelectedOrganization(undefined);
    }
  };

  return (
    <OrganizationsProvider>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Organizations</h1>
              <p className="text-muted-foreground">
                Manage your healthcare organizations and facilities
              </p>
            </div>
            <div className="flex space-x-2">
              <Tabs 
                value={viewMode} 
                onValueChange={(value) => setViewMode(value as "table" | "analytics")} 
                className="mr-4"
              >
                <TabsList>
                  <TabsTrigger value="table">
                    <Table2 className="h-4 w-4 mr-2" />
                    Table View
                  </TabsTrigger>
                  <TabsTrigger value="analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button onClick={handleAddOrganization}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Organization
              </Button>
            </div>
          </div>

          <OrganizationsFilters />
          
          <TabsContent value="table" className={viewMode === "table" ? "block" : "hidden"}>
            <OrganizationsTable onEdit={handleEditOrganization} />
          </TabsContent>
          
          <TabsContent value="analytics" className={viewMode === "analytics" ? "block" : "hidden"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OrganizationTypeChart />
              <OrganizationSizeDistribution />
            </div>
            <div className="mt-6">
              <OrganizationStatusCard />
            </div>
          </TabsContent>
          
          <OrganizationFormDialog 
            open={formOpen} 
            onOpenChange={handleDialogOpenChange} 
            organization={selectedOrganization} 
          />
        </div>
      </DashboardLayout>
    </OrganizationsProvider>
  );
};

export default Organizations;
