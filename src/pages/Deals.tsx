
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DealFilters from "@/components/deals/DealFilters";
import DealsSummary from "@/components/deals/DealsSummary";
import DealPipeline from "@/components/deals/DealPipeline";

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
        
        <DealFilters />
        <DealsSummary />
        <DealPipeline />
      </div>
    </DashboardLayout>
  );
};

export default Deals;
