
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DealPipeline from "@/components/deals/DealPipeline";
import DealFormDialog from "@/components/deals/DealFormDialog";
import DealFilters from "@/components/deals/DealFilters";
import DealsSummary from "@/components/deals/DealsSummary";
import DealDetailsView from "@/components/deals/DealDetailsView";

const Deals = () => {
  const [showAddDealDialog, setShowAddDealDialog] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"pipeline" | "details">("pipeline");

  const handleDealClick = (dealId: string) => {
    setSelectedDealId(dealId);
    setViewMode("details");
  };

  const handleBackToPipeline = () => {
    setSelectedDealId(null);
    setViewMode("pipeline");
  };

  const handleEditDeal = (dealId: string) => {
    // In a real app, this would populate the form with deal data
    setShowAddDealDialog(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {viewMode === "pipeline" ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Deals</h1>
                <p className="text-muted-foreground">
                  Manage and track your sales pipeline
                </p>
              </div>
              <Button onClick={() => setShowAddDealDialog(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Deal
              </Button>
            </div>

            <DealsSummary />
            
            <DealFilters />
            
            <DealPipeline onDealClick={handleDealClick} />
          </>
        ) : (
          <DealDetailsView 
            dealId={selectedDealId || ""}
            onBack={handleBackToPipeline}
            onEdit={handleEditDeal}
          />
        )}

        <DealFormDialog 
          open={showAddDealDialog} 
          onOpenChange={setShowAddDealDialog} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Deals;
