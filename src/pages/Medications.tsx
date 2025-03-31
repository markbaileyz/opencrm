
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const Medications = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Medications Management</h1>
        <div className="bg-muted/30 p-6 rounded-md text-center">
          <p className="text-lg mb-4">Medication management interface coming soon</p>
          <p className="text-sm text-muted-foreground">
            This section will include medication history, current prescriptions, and medication management tools
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Medications;
