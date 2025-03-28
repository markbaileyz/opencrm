
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useCRM } from "@/contexts/CRMContext";
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ModuleSelector: React.FC = () => {
  const { modules, addModule, removeModule, isModuleActive, getTotalPrice } = useCRM();
  
  const handleToggleModule = (moduleId: string, isActive: boolean) => {
    if (isActive) {
      try {
        removeModule(moduleId);
        toast.success("Module removed successfully");
      } catch (error) {
        toast.error("Failed to remove module. It might be required by other active modules.");
      }
    } else {
      addModule(moduleId);
      toast.success("Module added successfully");
    }
  };
  
  const totalPrice = getTotalPrice();
  
  // Check if a module can be removed (not a dependency for another active module)
  const canRemoveModule = (moduleId: string) => {
    // This is a simplified version. In a real implementation, 
    // you'd check if any active module depends on this one
    return true;
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Button asChild variant="outline" size="sm">
              <Link to="/crm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-bold">Configure Your CRM</h1>
          <p className="text-muted-foreground">Customize your CRM by adding or removing modules</p>
        </div>
        
        <Card className="w-auto">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Monthly Subscription</p>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              <Button size="sm">Update Billing</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isActive = isModuleActive(module.id);
          const ModuleIcon = module.icon;
          
          return (
            <Card 
              key={module.id} 
              className={`overflow-hidden transition-all ${
                isActive ? "border-primary shadow-md" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-md ${isActive ? "bg-primary/20" : "bg-muted"}`}>
                      <ModuleIcon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                  </div>
                  <Badge variant={isActive ? "default" : "outline"}>
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Features:</div>
                  <ul className="space-y-1">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {module.dependencies && module.dependencies.length > 0 && (
                  <div className="mt-4 text-sm">
                    <div className="font-medium mb-1">Required Modules:</div>
                    <div className="flex flex-wrap gap-1">
                      {module.dependencies.map((depId) => {
                        const depModule = modules.find(m => m.id === depId);
                        return depModule ? (
                          <Badge key={depId} variant="outline">
                            {depModule.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="bg-muted/50 flex items-center justify-between">
                <div className="text-sm font-medium">
                  ${module.price.toFixed(2)}/month
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{isActive ? "Enabled" : "Disabled"}</span>
                  <Switch 
                    checked={isActive}
                    onCheckedChange={() => handleToggleModule(module.id, isActive)}
                  />
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleSelector;
