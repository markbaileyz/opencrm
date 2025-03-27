
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const SleepTabContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Last Night's Sleep</CardTitle>
          <CardDescription>7h 42m total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Deep Sleep</span>
              <span>2h 15m</span>
            </div>
            <Progress value={30} className="h-2" />
            
            <div className="flex justify-between text-sm">
              <span>Light Sleep</span>
              <span>4h 10m</span>
            </div>
            <Progress value={53} className="h-2" />
            
            <div className="flex justify-between text-sm">
              <span>REM Sleep</span>
              <span>1h 17m</span>
            </div>
            <Progress value={17} className="h-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">View Details</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SleepTabContent;
