
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

interface DealActivityPanelProps {
  timeline: TimelineItem[];
  onAddActivity?: () => void;
}

const DealActivityPanel: React.FC<DealActivityPanelProps> = ({
  timeline,
  onAddActivity
}) => {
  // Sort timeline items with newest first
  const sortedTimeline = [...timeline].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-4">
      {onAddActivity && (
        <div className="flex justify-end">
          <Button size="sm" variant="outline" onClick={onAddActivity}>
            <Plus className="h-4 w-4 mr-1" />
            Activity
          </Button>
        </div>
      )}
      
      <div className="space-y-1">
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
    </div>
  );
};

export default DealActivityPanel;
