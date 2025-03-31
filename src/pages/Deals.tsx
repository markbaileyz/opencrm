
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DealFormDialog from "@/components/deals/DealFormDialog";
import DealsHeader from "@/components/deals/DealsHeader";
import DealsContent from "@/components/deals/DealsContent";
import { Deal } from "@/types/deal";
import { useDeals } from "@/hooks/useDeals";

const Deals = () => {
  const [showAddDealDialog, setShowAddDealDialog] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"pipeline" | "details" | "analytics">("pipeline");
  const [filters, setFilters] = useState({
    search: "",
    stage: "all",
    value: "all",
    sortBy: "newest",
    organization: "all",
    closeDate: "all",
    probability: "all"
  });
  const [editDealData, setEditDealData] = useState<Deal | null>(null);
  const { deals, handleAddDeal, handleDealMoved } = useDeals();

  const handleDealClick = (dealId: string) => {
    setSelectedDealId(dealId);
    setViewMode("details");
  };

  const handleBackToPipeline = () => {
    setSelectedDealId(null);
    setViewMode("pipeline");
  };

  const handleEditDeal = (dealId: string) => {
    const dealToEdit = deals.find(d => d.id === dealId);
    if (dealToEdit) {
      setEditDealData(dealToEdit);
      setShowAddDealDialog(true);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {viewMode === "details" ? (
          <DealsContent
            viewMode={viewMode}
            selectedDealId={selectedDealId}
            filters={filters}
            deals={deals}
            onDealClick={handleDealClick}
            onDealMoved={handleDealMoved}
            onFilterChange={handleFilterChange}
            onEditDeal={handleEditDeal}
            onBackToPipeline={handleBackToPipeline}
          />
        ) : (
          <>
            <DealsHeader 
              setShowAddDealDialog={setShowAddDealDialog}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            <DealsContent
              viewMode={viewMode}
              selectedDealId={selectedDealId}
              filters={filters}
              deals={deals}
              onDealClick={handleDealClick}
              onDealMoved={handleDealMoved}
              onFilterChange={handleFilterChange}
              onEditDeal={handleEditDeal}
              onBackToPipeline={handleBackToPipeline}
            />
          </>
        )}

        <DealFormDialog 
          open={showAddDealDialog} 
          onOpenChange={(open) => {
            setShowAddDealDialog(open);
            if (!open) setEditDealData(null); // Reset edit data when dialog closes
          }}
          onSubmit={handleAddDeal}
          initialData={editDealData}
        />
      </div>
    </DashboardLayout>
  );
};

export default Deals;
