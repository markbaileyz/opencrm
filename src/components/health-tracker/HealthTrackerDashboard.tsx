
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, HeartPulse, Utensils, Dumbbell, MoonStar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VitalsTabContent from "./VitalsTabContent";
import NutritionTabContent from "./NutritionTabContent";
import ActivityTabContent from "./ActivityTabContent";
import SleepTabContent from "./SleepTabContent";
import HealthSummaryCard from "./HealthSummaryCard";

const HealthTrackerDashboard: React.FC = () => {
  const { toast } = useToast();
  
  const handleRecordNew = (type: string) => {
    toast({
      title: "Record New Entry",
      description: `New ${type} recording functionality will be implemented soon.`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <HealthSummaryCard />
        
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            <CardDescription>Record new health metrics or view reports</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="flex flex-col h-24 space-y-2" 
              onClick={() => handleRecordNew("vitals")}
            >
              <HeartPulse className="h-6 w-6 text-red-500" />
              <span>Record Vitals</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-24 space-y-2" 
              onClick={() => handleRecordNew("nutrition")}
            >
              <Utensils className="h-6 w-6 text-green-500" />
              <span>Log Meal</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-24 space-y-2" 
              onClick={() => handleRecordNew("activity")}
            >
              <Dumbbell className="h-6 w-6 text-blue-500" />
              <span>Track Activity</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-24 space-y-2" 
              onClick={() => handleRecordNew("sleep")}
            >
              <MoonStar className="h-6 w-6 text-indigo-500" />
              <span>Log Sleep</span>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Health Tracking</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>
          <CardDescription>
            Track and monitor your health metrics over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vitals" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="vitals">
                <HeartPulse className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Vitals</span>
              </TabsTrigger>
              <TabsTrigger value="nutrition">
                <Utensils className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Nutrition</span>
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Dumbbell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="sleep">
                <MoonStar className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sleep</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="vitals">
              <VitalsTabContent />
            </TabsContent>
            
            <TabsContent value="nutrition">
              <NutritionTabContent />
            </TabsContent>
            
            <TabsContent value="activity">
              <ActivityTabContent />
            </TabsContent>
            
            <TabsContent value="sleep">
              <SleepTabContent />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthTrackerDashboard;
