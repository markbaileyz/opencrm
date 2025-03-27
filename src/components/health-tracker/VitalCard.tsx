
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface VitalCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
  icon: React.ReactNode;
  unit: string;
  lastUpdated: string;
}

const VitalCard: React.FC<VitalCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendDirection, 
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
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
          <Badge 
            variant={trendDirection === "neutral" ? "outline" : "default"} 
            className={`ml-auto ${
              trendDirection === "down" ? "bg-green-500" : 
              trendDirection === "up" ? "bg-red-500" : ""
            }`}
          >
            {trend}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">View History</Button>
      </CardFooter>
    </Card>
  );
};

export default VitalCard;
