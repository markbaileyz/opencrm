
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Roadmap = ({ isDashboard = false }) => {
  const [activeTab, setActiveTab] = useState("recent");
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Healthcare CRM Roadmap</h1>
        <p className="text-muted-foreground">
          Our development roadmap outlines upcoming features and improvements planned for our healthcare CRM platform.
        </p>
      </div>
      
      <Tabs defaultValue="recent" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="recent">Recent Releases</TabsTrigger>
          <TabsTrigger value="current">Current Sprint</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1 inline-block mb-3">Released</div>
                  <h3 className="text-lg font-medium mb-2">Patient Portal Improvements</h3>
                  <p className="text-muted-foreground text-sm mb-4">Enhanced patient profile views and medical history visualization.</p>
                  <div className="text-xs text-muted-foreground">Released: 2 weeks ago</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="current" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1 inline-block mb-3">In Progress</div>
                  <h3 className="text-lg font-medium mb-2">Telehealth Integration</h3>
                  <p className="text-muted-foreground text-sm mb-4">Integrating video conferencing directly into the patient records system.</p>
                  <div className="text-xs text-muted-foreground">Expected: Next month</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-1 inline-block mb-3">Planned</div>
                  <h3 className="text-lg font-medium mb-2">AI-Powered Analytics</h3>
                  <p className="text-muted-foreground text-sm mb-4">Predictive analytics for patient outcomes and treatment recommendations.</p>
                  <div className="text-xs text-muted-foreground">Planned: Q3 2023</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Roadmap;
