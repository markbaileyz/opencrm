
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCRM } from "@/contexts/CRMContext";
import { Settings, ArrowRight } from "lucide-react";

const CRMDashboard: React.FC = () => {
  const { getActiveModules, getTotalPrice } = useCRM();
  
  const activeModules = getActiveModules();
  const totalPrice = getTotalPrice();
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your CRM Dashboard</h1>
          <p className="text-muted-foreground">Manage your CRM modules and access your tools</p>
        </div>
        
        <Button asChild variant="outline">
          <Link to="/crm-config">
            <Settings className="h-4 w-4 mr-2" />
            Configure Modules
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Modules</CardTitle>
            <CardDescription>Modules currently active in your CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeModules.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly Price</CardTitle>
            <CardDescription>Your current subscription cost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalPrice.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Next Billing Date</CardTitle>
            <CardDescription>Your next billing cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Your Modules</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeModules.map((module) => {
          const ModuleIcon = module.icon;
          
          return (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <ModuleIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{module.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <CardDescription className="mb-2">{module.description}</CardDescription>
                <Button asChild size="sm">
                  <Link to={`/crm/${module.id}`}>
                    Open Module
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CRMDashboard;
