
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarNavigationProps {
  currentDate: Date;
  view: "day" | "week" | "month";
  onViewChange: (value: "day" | "week" | "month") => void;
  onNavigate: (direction: "prev" | "next") => void;
  formatDate: (date: Date) => string;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentDate,
  view,
  onViewChange,
  onNavigate,
  formatDate
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => onNavigate("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-lg font-medium">{formatDate(currentDate)}</div>
        <Button variant="outline" size="icon" onClick={() => onNavigate("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Tabs value={view} onValueChange={(value) => onViewChange(value as "day" | "week" | "month")}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default CalendarNavigation;
