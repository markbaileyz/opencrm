
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DealTimelineItem from "./DealTimelineItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TimelineItem {
  id: string;
  type: "stage-change" | "note" | "meeting" | "email" | "task" | "contact";
  title: string;
  date: Date;
  user: string;
  description?: string;
  completed?: boolean;
}

interface DealTimelineProps {
  timeline: TimelineItem[];
  onAddActivity?: () => void;
}

const DealTimeline: React.FC<DealTimelineProps> = ({
  timeline,
  onAddActivity
}) => {
  const sortedTimeline = [...timeline].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Deal Activity Timeline</CardTitle>
        {onAddActivity && (
          <Button size="sm" variant="outline" onClick={onAddActivity}>
            <Plus className="h-4 w-4 mr-1" />
            Activity
          </Button>
        )}
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default DealTimeline;
