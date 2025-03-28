import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, Package, FileText, MessageSquare, Users, Home, Clock } from "lucide-react";
import RoomManagement from "@/components/office/RoomManagement";
import SuppliesManagement from "@/components/office/SuppliesManagement";
import ScheduledTasksManagement from "@/components/office/ScheduledTasksManagement";
import CommunicationsManagement from "@/components/office/CommunicationsManagement";
import { useOfficeResources } from "@/hooks/useOfficeResources";

const Office = () => {
  const { lowStockSupplies, overdueTasks } = useOfficeResources();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Office Management</h1>
          <p className="text-muted-foreground">
            Manage office tasks, schedules, and resources
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="tasks">
              Tasks
              {overdueTasks && overdueTasks.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {overdueTasks.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="resources">
              Resources
              {lowStockSupplies.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {lowStockSupplies.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's Appointments
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    2 are new patients
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Tasks
                  </CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overdueTasks ? overdueTasks.length : 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {overdueTasks && overdueTasks.length > 0 ? 'Overdue tasks need attention' : 'No overdue tasks'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Staff On Duty
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">
                    2 doctors, 3 nurses, 1 admin
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Supplies to Reorder
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{lowStockSupplies.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {lowStockSupplies.length > 0 ? 'Items below minimum stock' : 'All supplies are stocked'}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Office Dashboard</CardTitle>
                  <CardDescription>
                    Daily operations overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                    <p className="text-muted-foreground">Dashboard charts coming soon</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Frequently used tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    New Patient Form
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Home className="mr-2 h-4 w-4" />
                    Room Status
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduling" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Office Schedule</CardTitle>
                <CardDescription>
                  Manage appointments and staff schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
                  <p className="text-muted-foreground">Calendar view coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-4">
            <ScheduledTasksManagement />
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <RoomManagement />
            <SuppliesManagement />
          </TabsContent>
          
          <TabsContent value="communications" className="space-y-4">
            <CommunicationsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Office;
