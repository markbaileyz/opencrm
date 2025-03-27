
import React from "react";
import DealPipeline from "@/components/deals/DealPipeline";
import DealDetailsView from "@/components/deals/DealDetailsView";
import DealsSummary from "@/components/deals/DealsSummary";
import DealFilters from "@/components/deals/DealFilters";
import DealAnalytics from "@/components/deals/DealAnalytics";
import { Deal } from "@/types/deal";
import { filterDeals } from "@/utils/dealFilters";
import { DealFiltersState } from "./types/dealFilterTypes";

interface DealsContentProps {
  viewMode: "pipeline" | "details" | "analytics";
  selectedDealId: string | null;
  filters: DealFiltersState;
  deals: Deal[];
  onDealClick: (dealId: string) => void;
  onDealMoved: (dealId: string, newStage: string) => void;
  onFilterChange: (filters: DealFiltersState) => void;
  onEditDeal: (dealId: string) => void;
  onBackToPipeline: () => void;
}

const DealsContent: React.FC<DealsContentProps> = ({
  viewMode,
  selectedDealId,
  filters,
  deals,
  onDealClick,
  onDealMoved,
  onFilterChange,
  onEditDeal,
  onBackToPipeline
}) => {
  // Filtered deals based on current filters
  const filteredDeals = filterDeals(deals, filters);

  if (viewMode === "details" && selectedDealId) {
    return (
      <DealDetailsView 
        dealId={selectedDealId}
        onBack={onBackToPipeline}
        onEdit={onEditDeal}
      />
    );
  }

  return (
    <>
      <DealsSummary deals={filteredDeals} />
      
      <DealFilters 
        filters={filters}
        onFilterChange={onFilterChange}
      />
      
      {viewMode === "pipeline" && (
        <DealPipeline 
          deals={filteredDeals}
          onDealClick={onDealClick}
          onDealMoved={onDealMoved} 
        />
      )}

      {viewMode === "analytics" && (
        <DealAnalytics deals={filteredDeals} />
      )}
    </>
  );
};

export default DealsContent;
