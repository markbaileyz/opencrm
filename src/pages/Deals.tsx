
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DealFilters, { DealFiltersState } from "@/components/deals/DealFilters";
import DealPipeline from "@/components/deals/DealPipeline";
import DealsSummary from "@/components/deals/DealsSummary";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BarChart3, SlidersHorizontal } from "lucide-react";
import DealFormDialog from "@/components/deals/DealFormDialog";
import DealStagesManager from "@/components/deals/DealStagesManager";
import { Deal } from "@/types/deal";
import { filterDeals } from "@/utils/dealFilters";
import { useToast } from "@/hooks/use-toast";

// Sample deals data
const sampleDeals: Deal[] = [
  {
    id: "1",
    name: "Enterprise Software Upgrade",
    stage: "proposal",
    organization: "1", // Acme Corp
    contact: "2", // Jane Smith
    value: 75000,
    closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    probability: 70,
    description: "Complete upgrade of enterprise software suite across all departments",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Medical Equipment Purchase",
    stage: "negotiation",
    organization: "5", // Umbrella Corp
    contact: "3", // Mike Johnson
    value: 125000,
    closeDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    probability: 85,
    description: "New MRI equipment purchase for the radiology department",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "3",
    name: "Staff Training Program",
    stage: "qualification",
    organization: "3", // Initech
    contact: "1", // John Doe
    value: 28000,
    closeDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    probability: 40,
    description: "Comprehensive staff training on new financial software",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(),
  },
];

const Deals = () => {
  const [deals, setDeals] = useState<Deal[]>(sampleDeals);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(sampleDeals);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("pipeline");
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<DealFiltersState>({
    search: "",
    stage: "all",
    organization: "all",
    closeDate: "all",
    value: "all"
  });
  
  // Apply filters whenever filters or deals change
  useEffect(() => {
    setFilteredDeals(filterDeals(deals, filters));
  }, [deals, filters]);
  
  const handleFilterChange = (newFilters: Partial<DealFiltersState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleAddDeal = () => {
    setSelectedDeal(undefined);
    setFormOpen(true);
  };
  
  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setFormOpen(true);
  };
  
  const handleFormOpenChange = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setSelectedDeal(undefined);
    }
  };
  
  const handleDealSubmit = (formData: Partial<Deal>) => {
    if (selectedDeal) {
      // Update existing deal
      const updatedDeals = deals.map(deal => 
        deal.id === selectedDeal.id ? { ...deal, ...formData, updatedAt: new Date().toISOString() } : deal
      );
      setDeals(updatedDeals);
      toast({
        title: "Deal updated",
        description: `Successfully updated deal: ${formData.name}`,
      });
    } else {
      // Create new deal
      const newDeal: Deal = {
        id: `${Date.now()}`, // Simple ID generation
        name: formData.name || "Unnamed Deal",
        stage: formData.stage || "lead",
        organization: formData.organization,
        contact: formData.contact,
        value: formData.value || 0,
        closeDate: formData.closeDate || new Date().toISOString(),
        probability: formData.probability || 50,
        description: formData.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setDeals([...deals, newDeal]);
      toast({
        title: "Deal created",
        description: `Successfully created deal: ${newDeal.name}`,
      });
    }
    
    setFormOpen(false);
  };
  
  const handleDragEnd = (result: any) => {
    // To be implemented: drag and drop functionality
    console.log("Drag ended", result);
    toast({
      title: "Feature in development",
      description: "Drag and drop functionality coming soon!",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Deals</h1>
            <p className="text-muted-foreground">
              Manage your sales pipeline and track deal progress
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleAddDeal}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </div>
        
        <DealFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <DealsSummary deals={filteredDeals} />
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Pipeline</span>
            </TabsTrigger>
            <TabsTrigger value="stages" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Manage Stages</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipeline">
            <DealPipeline deals={filteredDeals} onEdit={handleEditDeal} />
          </TabsContent>
          
          <TabsContent value="stages">
            <DealStagesManager />
          </TabsContent>
        </Tabs>
        
        <DealFormDialog 
          open={formOpen} 
          onOpenChange={handleFormOpenChange} 
          deal={selectedDeal}
          onSubmit={handleDealSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default Deals;
