
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const Email = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Email</h1>
          <p className="text-muted-foreground">
            Manage your email communications with contacts
          </p>
        </div>
        
        <div className="flex justify-center items-center h-64 bg-muted/30 rounded-lg border border-dashed border-muted">
          <p className="text-muted-foreground">Email functionality coming soon</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Email;
