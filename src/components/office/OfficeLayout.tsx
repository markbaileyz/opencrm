
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoomManagement from "./RoomManagement";
import { FileEdit, FileUp, FileDown, Printer } from "lucide-react";

const OfficeLayout = () => {
  const [activeTab, setActiveTab] = useState("rooms");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Office Layout</h2>
          <p className="text-muted-foreground">
            Manage your office physical layout and room assignments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileEdit className="h-4 w-4 mr-2" />
            Edit Layout
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <FileUp className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="map">Office Map</TabsTrigger>
          <TabsTrigger value="assignments">Staff Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="rooms" className="mt-6">
          <RoomManagement />
        </TabsContent>
        <TabsContent value="map" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Office Map</CardTitle>
              <CardDescription>
                Interactive map of your office layout
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20 rounded-md">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Office map visualization coming soon</p>
                <Button variant="outline">Upload Floor Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Room Assignments</CardTitle>
              <CardDescription>
                Assign staff members to office rooms
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Staff assignment feature coming soon</p>
                <Button>Create Assignments</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfficeLayout;
