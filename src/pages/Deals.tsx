
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const Deals = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Deals</h1>
          <p className="text-muted-foreground">
            Manage your sales pipeline and track deals
          </p>
        </div>
        
        <div className="flex justify-center items-center h-64 bg-muted/30 rounded-lg border border-dashed border-muted">
          <p className="text-muted-foreground">Deals functionality coming soon</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Deals;
