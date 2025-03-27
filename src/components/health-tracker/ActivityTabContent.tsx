
import React from "react";
import { Activity } from "lucide-react";
import ActivityCard from "./ActivityCard";

const ActivityTabContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ActivityCard 
        title="Steps"
        value="8,742"
        goal="10,000"
        completion={87}
        icon={<Activity className="h-5 w-5" />}
        lastUpdated="Today, ongoing"
      />
      <ActivityCard 
        title="Distance"
        value="3.2"
        goal="5"
        completion={64}
        icon={<Activity className="h-5 w-5" />}
        unit="miles"
        lastUpdated="Today, ongoing"
      />
      <ActivityCard 
        title="Active Minutes"
        value="42"
        goal="60"
        completion={70}
        icon={<Activity className="h-5 w-5" />}
        unit="min"
        lastUpdated="Today, ongoing"
      />
    </div>
  );
};

export default ActivityTabContent;
