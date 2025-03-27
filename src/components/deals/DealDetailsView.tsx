
import React, { useState } from "react";
import DealDetailPanel from "./DealDetailPanel";
import DealConversionStats from "./DealConversionStats";
import DealActivity from "./DealActivity";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface DealDetailsViewProps {
  dealId: string;
  onBack: () => void;
  onEdit?: (dealId: string) => void;
}

const DealDetailsView: React.FC<DealDetailsViewProps> = ({
  dealId,
  onBack,
  onEdit
}) => {
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

  const handleDeleteDeal = () => {
    // In a real app, this would call an API to delete the deal
    setShowDeleteConfirm(false);
    toast({
      title: "Deal deleted",
      description: "The deal has been successfully deleted.",
    });
    onBack();
  };

  const handleAddActivity = () => {
    toast({
      title: "Add activity",
      description: "Activity form would open here",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Deals
        </Button>
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" onClick={() => onEdit(dealId)} className="gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
          <Button variant="outline" onClick={() => setShowDeleteConfirm(true)} className="gap-1 text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{dealData.name}</h1>
        <div className="flex items-center gap-3 mt-1 text-muted-foreground">
          <span>{dealData.organization.name}</span>
          <span>•</span>
          <span>{dealData.stage}</span>
          <span>•</span>
          <span>${dealData.value.toLocaleString()}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DealDetailPanel 
                deal={dealData} 
                timeline={timeline}
                onAddActivity={handleAddActivity}
              />
            </div>
            <div>
              <DealConversionStats
                stageConversions={stageConversions}
                overallConversionRate={32}
                timeFrame="Last 30 days"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <DealActivity dealId={dealId} />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-6">
              <DealConversionStats
                stageConversions={stageConversions}
                overallConversionRate={32}
                timeFrame="Last 30 days"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the deal
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDeal} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DealDetailsView;
