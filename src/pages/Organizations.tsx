
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { OrganizationsProvider } from "@/context/OrganizationsContext";
import OrganizationsTable from "@/components/organizations/OrganizationsTable";
import OrganizationsFilters from "@/components/organizations/OrganizationsFilters";
import OrganizationFormDialog from "@/components/organizations/OrganizationFormDialog";
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Organizations = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | undefined>(undefined);

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
            <Button onClick={handleAddOrganization}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Organization
            </Button>
          </div>

          <OrganizationsFilters />
          
          <OrganizationsTable onEdit={handleEditOrganization} />
          
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
