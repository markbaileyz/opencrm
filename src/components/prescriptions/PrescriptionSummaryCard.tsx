
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PrescriptionSummaryCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  changeText: string;
  lastUpdated: string;
}

const PrescriptionSummaryCard: React.FC<PrescriptionSummaryCardProps> = ({
  title,
  icon,
  count,
  changeText,
  lastUpdated
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>Last updated: {lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold">{count}</span>
          <span className="text-sm text-muted-foreground">{changeText}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default PrescriptionSummaryCard;
