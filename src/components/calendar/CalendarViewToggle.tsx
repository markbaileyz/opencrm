
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, CalendarClock, Calendar } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CalendarViewToggleProps {
  currentView: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

const CalendarViewToggle: React.FC<CalendarViewToggleProps> = ({
  currentView,
  onViewChange
}) => {
  return (
    <div className="flex justify-end mb-4">
      <ToggleGroup type="single" value={currentView} onValueChange={(value) => value && onViewChange(value as 'day' | 'week' | 'month')}>
        <ToggleGroupItem value="day" aria-label="Day view">
          <CalendarClock className="h-4 w-4 mr-2" />
          Day
        </ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="Week view">
          <CalendarDays className="h-4 w-4 mr-2" />
          Week
        </ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="Month view">
          <Calendar className="h-4 w-4 mr-2" />
          Month
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default CalendarViewToggle;
