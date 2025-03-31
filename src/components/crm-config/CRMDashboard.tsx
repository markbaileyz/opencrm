
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCRM } from "@/contexts/CRMContext";
import ModuleCard from "./ModuleCard";
import ModuleSelector from "./ModuleSelector";

// Define props interface for CalendarWidget
interface CalendarWidgetProps {
  className?: string;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
        <CardDescription>Your scheduled events for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <div>
              <div className="font-medium">Client Meeting</div>
              <div className="text-xs text-muted-foreground">10:00 AM - 11:00 AM</div>
            </div>
            <div className="text-sm">In 2 hours</div>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <div>
              <div className="font-medium">Team Standup</div>
              <div className="text-xs text-muted-foreground">1:00 PM - 1:30 PM</div>
            </div>
            <div className="text-sm">In 5 hours</div>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <div>
              <div className="font-medium">Project Review</div>
              <div className="text-xs text-muted-foreground">3:00 PM - 4:00 PM</div>
            </div>
            <div className="text-sm">In 7 hours</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Define props interface for TaskWidget
interface TaskWidgetProps {
  className?: string;
}

const TaskWidget: React.FC<TaskWidgetProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Tasks</CardTitle>
        <CardDescription>Your upcoming tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <div className="font-medium">Complete proposal</div>
            <div className="text-sm text-red-500">Overdue</div>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <div className="font-medium">Send follow-up emails</div>
            <div className="text-sm">Today</div>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <div className="font-medium">Review analytics report</div>
            <div className="text-sm">Tomorrow</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CRMDashboard: React.FC = () => {
  const { getActiveModules, modules } = useCRM();
  const activeModules = getActiveModules();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">CRM Dashboard</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Widget
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Active Modules</CardTitle>
              <CardDescription>Your currently active CRM modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeModules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <CalendarWidget className="h-[250px]" />
          <TaskWidget className="h-[250px]" />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Modules</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ModuleSelector modules={modules} className="grid grid-cols-1 md:grid-cols-3 gap-4" />
        </TabsContent>
        
        <TabsContent value="business" className="mt-6">
          <ModuleSelector 
            modules={modules.filter(m => m.category === "business")}
            className="grid grid-cols-1 md:grid-cols-3 gap-4" 
          />
        </TabsContent>
        
        <TabsContent value="healthcare" className="mt-6">
          <ModuleSelector 
            modules={modules.filter(m => m.category === "healthcare")}
            className="grid grid-cols-1 md:grid-cols-3 gap-4" 
          />
        </TabsContent>
        
        <TabsContent value="real-estate" className="mt-6">
          <ModuleSelector 
            modules={modules.filter(m => m.category === "real-estate")}
            className="grid grid-cols-1 md:grid-cols-3 gap-4" 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRMDashboard;
