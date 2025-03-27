
import { useState } from "react";
import { Deal } from "@/types/deal";
import { useToast } from "@/hooks/use-toast";

export const useDeals = () => {
  const { toast } = useToast();
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

  const handleAddDeal = (data: any) => {
    if (data.id) {
      // Editing an existing deal
      const updatedDeals = deals.map(deal => 
        deal.id === data.id ? { ...deal, ...data, updatedAt: new Date() } : deal
      );
      setDeals(updatedDeals);
      
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

  return {
    deals,
    handleAddDeal,
    handleDealMoved
  };
};
