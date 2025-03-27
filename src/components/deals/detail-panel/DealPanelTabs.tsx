
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DealStageProgress from "../DealStageProgress";
import DealMetadata from "./DealMetadata";
import DealDescription from "./DealDescription";
import DealContacts from "./DealContacts";
import DealTimelineItem from "../DealTimelineItem";

interface TimelineItem {
  id: string;
  type: "stage-change" | "note" | "meeting" | "email" | "task" | "contact";
  title: string;
  date: Date;
  user: string;
  description?: string;
  completed?: boolean;
}

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

interface DealPanelTabsProps {
  deal: {
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
  timeline: TimelineItem[];
  onAddActivity?: () => void;
}

const DealPanelTabs: React.FC<DealPanelTabsProps> = ({
  deal,
  timeline,
  onAddActivity
}) => {
  // Sort timeline items with newest first
  const sortedTimeline = [...timeline].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Tabs defaultValue="details">
      <TabsList className="mb-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="contacts">Contacts</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <div className="space-y-6">
          <DealStageProgress
            currentStage={deal.stage}
            totalStages={deal.totalStages}
            currentStageIndex={deal.stageIndex}
            timeInStage={deal.daysSinceStageChange}
            averageTimeInStage={deal.avgDaysInStage}
            isStuck={deal.isStuck}
          />
          
          <DealMetadata
            closeDate={deal.closeDate}
            createdDate={deal.createdDate}
            value={deal.value}
            organizationName={deal.organization?.name}
          />
          
          <DealDescription
            description={deal.description}
            tags={deal.tags}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="activity">
        <div className="space-y-4">
          {sortedTimeline.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>No activities recorded yet</p>
            </div>
          ) : (
            sortedTimeline.map((item) => (
              <DealTimelineItem
                key={item.id}
                type={item.type}
                title={item.title}
                date={item.date}
                user={item.user}
                description={item.description}
                completed={item.completed}
              />
            ))
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="contacts">
        <DealContacts contacts={deal.contacts} />
      </TabsContent>
    </Tabs>
  );
};

export default DealPanelTabs;
