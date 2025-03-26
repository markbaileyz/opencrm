
import React from "react";
import StatCard from "./StatCard";
import { Users, Calendar, MessageSquare, TrendingUp } from "lucide-react";

interface StatsGridProps {
  isAdmin: boolean;
}

const StatsGrid = ({ isAdmin }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
      <StatCard
        title="Total Customers"
        value={isAdmin ? "1,284" : "763"}
        icon={<Users className="h-5 w-5 text-primary" />}
        description={`${isAdmin ? "42" : "12"} new this month`}
        trend="up"
      />
      <StatCard
        title="Meetings"
        value={isAdmin ? "342" : "56"}
        icon={<Calendar className="h-5 w-5 text-primary" />}
        description={`${isAdmin ? "18" : "8"} today`}
        trend="up"
      />
      <StatCard
        title="Unread Messages"
        value={isAdmin ? "28" : "12"}
        icon={<MessageSquare className="h-5 w-5 text-primary" />}
        description="Last message 12m ago"
        trend="neutral"
      />
      <StatCard
        title="Customer Satisfaction"
        value={isAdmin ? "92%" : "94%"}
        icon={<TrendingUp className="h-5 w-5 text-primary" />}
        description="3% increase"
        trend="up"
      />
    </div>
  );
};

export default StatsGrid;
