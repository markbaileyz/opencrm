
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, BarChart } from "lucide-react";
import DealPipeline from "@/components/deals/DealPipeline";
import DealFormDialog from "@/components/deals/DealFormDialog";
import DealFilters from "@/components/deals/DealFilters";
import DealsSummary from "@/components/deals/DealsSummary";
import DealDetailsView from "@/components/deals/DealDetailsView";
import { useToast } from "@/hooks/use-toast";
import { Deal } from "@/types/deal";
import { filterDeals } from "@/utils/dealFilters";
import DealAnalytics from "@/components/deals/DealAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Deals = () => {
  const { toast } = useToast();
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

  // Sample deals data
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "deal1",
      name: "Software Implementation",
      stage: "lead",
      value: 25000,
      probability: 20,
      closeDate: new Date("2023-12-30"),
      organization: "org1",
      description: "Initial implementation of CRM software",
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-10-20")
    },
    {
      id: "deal2",
      name: "Hardware Upgrade",
      stage: "qualification",
      value: 15000,
      probability: 40,
      closeDate: new Date("2023-12-15"),
      organization: "org2",
      description: "Server infrastructure upgrade",
      createdAt: new Date("2023-10-10"),
      updatedAt: new Date("2023-10-18")
    },
    {
      id: "deal3",
      name: "Annual Support Contract",
      stage: "proposal",
      value: 50000,
      probability: 60,
      closeDate: new Date("2023-11-30"),
      organization: "org3",
      description: "Yearly support and maintenance",
      createdAt: new Date("2023-09-25"),
      updatedAt: new Date("2023-10-22")
    }
  ]);

  // Filtered deals based on current filters
  const filteredDeals = filterDeals(deals, filters);

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

  const handleAddDeal = (data: any) => {
    // Check if we're editing an existing deal
    if (editDealData) {
      const updatedDeals = deals.map(deal => 
        deal.id === editDealData.id ? { ...deal, ...data, updatedAt: new Date() } : deal
      );
      setDeals(updatedDeals);
      setEditDealData(null);
      
      toast({
        title: "Deal updated",
        description: "The deal has been successfully updated.",
      });
    } else {
      // Create a new deal
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
    }
  };

  const handleDealMoved = (dealId: string, newStage: string) => {
    // Update the deal with the new stage
    const updatedDeals = deals.map(deal => {
      if (deal.id === dealId) {
        return {
          ...deal,
          stage: newStage,
          updatedAt: new Date(),
          // Update probability based on new stage
          probability: getProbabilityForStage(newStage)
        };
      }
      return deal;
    });
    
    setDeals(updatedDeals);
  };

  // Helper function to determine probability based on stage
  const getProbabilityForStage = (stage: string): number => {
    switch (stage) {
      case 'lead': return 10;
      case 'qualification': return 30;
      case 'proposal': return 50;
      case 'negotiation': return 70;
      case 'closed-won': return 100;
      case 'closed-lost': return 0;
      default: return 10;
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {viewMode === "details" ? (
          <DealDetailsView 
            dealId={selectedDealId || ""}
            onBack={handleBackToPipeline}
            onEdit={handleEditDeal}
          />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Deals</h1>
                <p className="text-muted-foreground">
                  Manage and track your sales pipeline
                </p>
              </div>
              <div className="flex gap-2">
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
                  <TabsList>
                    <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button onClick={() => setShowAddDealDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Deal
                </Button>
              </div>
            </div>

            <DealsSummary deals={filteredDeals} />
            
            <DealFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            
            {viewMode === "pipeline" && (
              <DealPipeline 
                deals={filteredDeals}
                onDealClick={handleDealClick}
                onDealMoved={handleDealMoved} 
              />
            )}

            {viewMode === "analytics" && (
              <DealAnalytics deals={filteredDeals} />
            )}
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
