
import { useState } from "react";

export const useCalendarNavigation = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [view, setView] = useState<"day" | "week" | "month">("day");

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    
    if (view === "day") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: "day" | "week" | "month") => {
    setView(newView);
  };

  return {
    currentDate,
    view,
    formatDate,
    navigateDate,
    handleViewChange,
  };
};
