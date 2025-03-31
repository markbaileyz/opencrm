
import React from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { VERSION } from "@/version";

interface ProgressStats {
  total: number;
  completed: number;
  inProgress: number;
  planned: number;
}

interface RoadmapProjectProgressProps {
  completionStats: ProgressStats;
}

const RoadmapProjectProgress: React.FC<RoadmapProjectProgressProps> = ({ 
  completionStats 
}) => {
  const completionPercentage = Math.round((completionStats.completed / completionStats.total) * 100);
  
  return (
    <div className="mb-8 bg-card p-6 rounded-lg border shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">Project Progress</h1>
          <p className="text-muted-foreground">Version {VERSION.toString()}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Badge variant="outline" className="text-sm">
            {completionStats.completed} / {completionStats.total} Features
          </Badge>
          <Badge variant={completionPercentage > 75 ? "success" : completionPercentage > 50 ? "primary" : "warning"} className="text-sm">
            {completionPercentage}% Complete
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-background p-4 rounded border flex items-center">
          <div className="mr-3 p-2 bg-green-500/10 rounded-full">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">{completionStats.completed}</p>
          </div>
        </div>
        <div className="bg-background p-4 rounded border flex items-center">
          <div className="mr-3 p-2 bg-blue-500/10 rounded-full">
            <Check className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold">{completionStats.inProgress}</p>
          </div>
        </div>
        <div className="bg-background p-4 rounded border flex items-center">
          <div className="mr-3 p-2 bg-amber-500/10 rounded-full">
            <Check className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Planned</p>
            <p className="text-2xl font-bold">{completionStats.planned}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Link to="/mind-map">
          <ButtonCustom variant="outline">
            View Mind Map
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default RoadmapProjectProgress;
