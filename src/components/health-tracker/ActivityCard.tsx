
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ActivityCardProps {
  title: string;
  value: string;
  goal: string;
  completion: number;
  icon: React.ReactNode;
  unit?: string;
  lastUpdated: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  title, 
  value, 
  goal, 
  completion, 
  icon,
  unit,
  lastUpdated
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            <span className="text-sm text-muted-foreground ml-auto">Goal: {goal} {unit}</span>
          </div>
          <div className="space-y-1">
            <Progress value={completion} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completion}% of daily goal</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">View Activity</Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
