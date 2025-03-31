
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrganizationInsightsDashboard from "@/components/organizations/visualization/OrganizationInsightsDashboard";
import { OrganizationsProvider } from "@/context/OrganizationsContext";

const Organizations = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <OrganizationsProvider>
          <OrganizationInsightsDashboard />
        </OrganizationsProvider>
      </div>
    </DashboardLayout>
  );
};

export default Organizations;
