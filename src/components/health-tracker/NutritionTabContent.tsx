
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const NutritionTabContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Today's Nutrition</CardTitle>
          <CardDescription>1,840 calories consumed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Carbs</span>
              <span>210g / 250g</span>
            </div>
            <Progress value={84} className="h-2" />
            
            <div className="flex justify-between text-sm">
              <span>Protein</span>
              <span>95g / 120g</span>
            </div>
            <Progress value={79} className="h-2" />
            
            <div className="flex justify-between text-sm">
              <span>Fat</span>
              <span>62g / 70g</span>
            </div>
            <Progress value={88} className="h-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">Log Food</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NutritionTabContent;
