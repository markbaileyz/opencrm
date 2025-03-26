
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  trend: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, icon, description, trend }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="p-2 rounded-full bg-primary/10">{icon}</span>
          {trend === "up" && (
            <span className="text-green-500 text-xs font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Growing
            </span>
          )}
          {trend === "down" && (
            <span className="text-red-500 text-xs font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
              Declining
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
