
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export const useDealDetailsData = (dealId: string, onBack: () => void) => {
  const { toast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data - in a real app this would come from an API
  const dealData = {
    id: dealId,
    name: "Enterprise Solution Package",
    stage: "Proposal",
    stageIndex: 2,
    totalStages: 5,
    value: 75000,
    probability: 60,
    closeDate: new Date("2023-12-15"),
    createdDate: new Date("2023-09-05"),
    daysSinceStageChange: 12,
    avgDaysInStage: 9,
    description: "Comprehensive enterprise software package including CRM, ERP, and HR modules. Client is looking for a scalable solution that can grow with their business over the next 5 years.",
    tags: ["Enterprise", "Software", "High Priority"],
    organization: {
      id: "org-123",
      name: "Acme Corporation",
      industry: "Technology"
    },
    contacts: [
      {
        id: "contact-1",
        name: "John Smith",
        email: "john.smith@acme.com",
        position: "CTO"
      },
      {
        id: "contact-2",
        name: "Sarah Johnson",
        email: "sarah.johnson@acme.com",
        position: "Procurement Manager"
      }
    ]
  };

  const timeline = [
    {
      id: "1",
      type: "stage-change" as const,
      title: "Deal moved to Proposal stage",
      date: new Date("2023-11-10"),
      user: "Alex Morgan",
      description: "Moved from Qualification after technical requirements discussion"
    },
    {
      id: "2",
      type: "meeting" as const,
      title: "Discovery call with technical team",
      date: new Date("2023-11-05"),
      user: "Alex Morgan",
      description: "Discussed technical requirements and integration points"
    },
    {
      id: "3",
      type: "note" as const,
      title: "Pricing considerations",
      date: new Date("2023-10-28"),
      user: "Emma Thompson",
      description: "Client has budget constraints, consider offering phased implementation"
    },
    {
      id: "4",
      type: "email" as const,
      title: "Sent initial proposal outline",
      date: new Date("2023-10-25"),
      user: "Alex Morgan",
      description: "Outlined key solution components and rough timeline"
    },
    {
      id: "5",
      type: "task" as const,
      title: "Prepare technical specifications document",
      date: new Date("2023-10-20"),
      user: "Chris Davis",
      completed: true
    }
  ];

  const stageConversions = [
    {
      fromStage: "Lead",
      toStage: "Qualification",
      conversionRate: 68,
      trend: "up" as const,
      change: 5
    },
    {
      fromStage: "Qualification",
      toStage: "Proposal",
      conversionRate: 52,
      trend: "stable" as const,
      change: 0
    },
    {
      fromStage: "Proposal",
      toStage: "Negotiation",
      conversionRate: 42,
      trend: "down" as const,
      change: -3
    },
    {
      fromStage: "Negotiation",
      toStage: "Closed Won",
      conversionRate: 76,
      trend: "up" as const,
      change: 8
    }
  ];

  const handleDeleteDeal = useCallback(() => {
    // In a real app, this would call an API to delete the deal
    setShowDeleteConfirm(false);
    toast({
      title: "Deal deleted",
      description: "The deal has been successfully deleted.",
    });
    onBack();
  }, [toast, onBack]);

  const handleAddActivity = useCallback(() => {
    toast({
      title: "Add activity",
      description: "Activity form would open here",
    });
  }, [toast]);

  return {
    dealData,
    timeline,
    stageConversions,
    showDeleteConfirm,
    setShowDeleteConfirm,
    activeTab,
    setActiveTab,
    handleDeleteDeal,
    handleAddActivity
  };
};
