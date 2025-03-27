
import React from "react";
import { Plus, Heart, Activity, Weight, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VitalCard from "./VitalCard";

const VitalsTabContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <VitalCard 
        title="Blood Pressure"
        value="120/80"
        trend="-5%"
        trendDirection="down"
        icon={<Heart className="h-5 w-5 text-red-500" />}
        unit="mmHg"
        lastUpdated="Today, 9:30 AM"
      />
      <VitalCard 
        title="Heart Rate"
        value="72"
        trend="+3"
        trendDirection="up"
        icon={<Activity className="h-5 w-5 text-red-500" />}
        unit="bpm"
        lastUpdated="Today, 9:30 AM"
      />
      <VitalCard 
        title="Weight"
        value="165"
        trend="-2"
        trendDirection="down"
        icon={<Weight className="h-5 w-5 text-blue-500" />}
        unit="lbs"
        lastUpdated="Yesterday, 7:45 PM"
      />
      <VitalCard 
        title="Blood Oxygen"
        value="98"
        trend="+1"
        trendDirection="up"
        icon={<Droplets className="h-5 w-5 text-blue-500" />}
        unit="%"
        lastUpdated="Today, 9:30 AM"
      />
      <VitalCard 
        title="Body Temperature"
        value="98.6"
        trend="0"
        trendDirection="neutral"
        icon={<Activity className="h-5 w-5 text-orange-500" />}
        unit="°F"
        lastUpdated="2 days ago"
      />
      <Card className="hover:shadow-md transition-shadow border-dashed border-2">
        <CardContent className="flex items-center justify-center h-full py-8">
          <Button variant="ghost" className="flex flex-col items-center gap-2">
            <Plus className="h-8 w-8 text-muted-foreground" />
            <span className="text-muted-foreground">Add New Vital</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VitalsTabContent;
