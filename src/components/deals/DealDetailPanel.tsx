
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DealPanelHeader from "./detail-panel/DealPanelHeader";
import DealPanelTabs from "./detail-panel/DealPanelTabs";

interface Contact {
  id: string;
  name: string;
  email: string;
  position: string;
}

interface Organization {
  id: string;
  name: string;
  industry?: string;
}

interface DealDetailPanelProps {
  deal: {
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
    isStuck?: boolean;
    description?: string;
    tags?: string[];
    organization?: Organization;
    contacts?: Contact[];
  };
  timeline: Array<{
    id: string;
    type: "stage-change" | "note" | "meeting" | "email" | "task" | "contact";
    title: string;
    date: Date;
    user: string;
    description?: string;
    completed?: boolean;
  }>;
  onAddActivity?: () => void;
}

const DealDetailPanel: React.FC<DealDetailPanelProps> = ({
  deal,
  timeline,
  onAddActivity
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 border-b">
        <DealPanelHeader
          dealName={deal.name}
          organizationName={deal.organization?.name}
          stage={deal.stage}
          value={deal.value}
          probability={deal.probability}
        />
      </CardHeader>
      <CardContent className="pt-4">
        <DealPanelTabs 
          deal={deal}
          timeline={timeline}
          onAddActivity={onAddActivity}
        />
      </CardContent>
    </Card>
  );
};

export default DealDetailPanel;
