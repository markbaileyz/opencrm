
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DealPipeline from "@/components/deals/DealPipeline";
import DealFormDialog from "@/components/deals/DealFormDialog";
import DealFilters from "@/components/deals/DealFilters";
import DealsSummary from "@/components/deals/DealsSummary";
import DealDetailsView from "@/components/deals/DealDetailsView";
import { useToast } from "@/hooks/use-toast";
import { Deal } from "@/types/deal";

const Deals = () => {
  const { toast } = useToast();
  const [showAddDealDialog, setShowAddDealDialog] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"pipeline" | "details">("pipeline");
  const [filters, setFilters] = useState({
    search: "",
    stage: "",
    value: "",
    sortBy: "newest"
  });

  // Sample deals data
  const [deals, setDeals] = useState<Deal[]>([]);

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

  const handleAddDeal = (data: any) => {
    // In a real app, this would call an API to create a deal
    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      name: data.name,
      stage: data.stage,
      value: data.value,
      probability: data.probability,
      closeDate: data.closeDate,
      organization: data.organization,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setDeals([...deals, newDeal]);
    
    toast({
      title: "Deal created",
      description: "The deal has been successfully created.",
    });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
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

            <DealsSummary deals={deals} />
            
            <DealFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            
            <DealPipeline 
              deals={deals}
              onDealClick={handleDealClick} 
            />
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
          onSubmit={handleAddDeal}
        />
      </div>
    </DashboardLayout>
  );
};

export default Deals;
