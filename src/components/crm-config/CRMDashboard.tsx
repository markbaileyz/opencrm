
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";
import { useCRM } from "@/contexts/CRMContext";
import ModuleSelector from "./ModuleSelector";
import { Link } from "react-router-dom";

const CRMDashboard: React.FC = () => {
  const { getActiveModules } = useCRM();
  const activeModules = getActiveModules();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs defaultValue="dashboard">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
          <TabsTrigger value="configure" className="flex-1">Configure Modules</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Your CRM Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your business with these active modules
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex gap-2">
                <Button asChild variant="outline">
                  <Link to="/crm-config">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/crm-config">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeModules.map((module) => {
                const Icon = module.icon;
                
                return (
                  <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <div className="p-2 rounded-md bg-primary/10 mr-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{module.description}</p>
                      <Button asChild className="w-full">
                        <Link to={`/crm/${module.id}`}>
                          Open Module
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              
              {activeModules.length === 0 && (
                <Card className="col-span-3 py-12">
                  <CardContent className="flex flex-col items-center justify-center">
                    <h3 className="text-xl font-medium mb-2">No Active Modules</h3>
                    <p className="text-muted-foreground mb-4 text-center max-w-md">
                      You haven't added any modules to your CRM yet. Add your first module to get started.
                    </p>
                    <Button asChild>
                      <Link to="/crm-config">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Module
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="configure" className="mt-6">
          <ModuleSelector />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRMDashboard;
