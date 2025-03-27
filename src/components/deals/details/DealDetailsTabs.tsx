
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DealDetailPanel from "../DealDetailPanel";
import DealActivity from "../DealActivity";
import DealConversionStats from "../DealConversionStats";

interface TimelineItem {
  id: string;
  type: "stage-change" | "note" | "meeting" | "email" | "task" | "contact";
  title: string;
  date: Date;
  user: string;
  description?: string;
  completed?: boolean;
}

interface StageConversion {
  fromStage: string;
  toStage: string;
  conversionRate: number;
  trend: "up" | "down" | "stable";
  change: number;
}

interface DealData {
  id: string;
  name: string;
  stage: string;
  stageIndex: number;
  totalStages: number;
  value: number;
  probability: number;
  closeDate: Date;
  createdDate: Date;
  daysSinceStageChange: number;
  avgDaysInStage: number;
  description: string;
  tags: string[];
  organization: {
    id: string;
    name: string;
    industry: string;
  };
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    position: string;
  }>;
}

interface DealDetailsTabsProps {
  dealId: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  dealData: DealData;
  timeline: TimelineItem[];
  stageConversions: StageConversion[];
  onAddActivity: () => void;
}

const DealDetailsTabs: React.FC<DealDetailsTabsProps> = ({
  dealId,
  activeTab,
  onTabChange,
  dealData,
  timeline,
  stageConversions,
  onAddActivity
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
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
              onAddActivity={onAddActivity}
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
  );
};

export default DealDetailsTabs;
