
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const AdminSettings = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
        <div className="bg-muted/30 p-6 rounded-md text-center">
          <p className="text-lg mb-4">Admin settings interface coming soon</p>
          <p className="text-sm text-muted-foreground">
            This section will include system configuration, security settings, and global preferences
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
