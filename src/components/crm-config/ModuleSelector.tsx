
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, X } from "lucide-react";
import { useCRM } from "@/contexts/CRMContext";
import { CRMModule } from "@/types/crm-modules";

interface ModuleSelectorProps {
  modules: CRMModule[];
  className?: string;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ modules, className }) => {
  const { isModuleActive, addModule, removeModule } = useCRM();
  
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "base":
        return "bg-blue-100 text-blue-800";
      case "healthcare":
        return "bg-green-100 text-green-800";
      case "real-estate":
        return "bg-orange-100 text-orange-800";
      case "business":
        return "bg-purple-100 text-purple-800";
      case "restaurant":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const renderDependencies = (module: CRMModule) => {
    if (!module.dependencies || module.dependencies.length === 0) return null;
    
    return (
      <div className="mt-2 text-xs text-muted-foreground">
        <div className="font-medium mb-1">Dependencies:</div>
        <div className="flex flex-wrap gap-1">
          {module.dependencies.map((depId) => {
            const dep = modules.find(m => m.id === depId);
            if (!dep) return null;
            
            return (
              <Badge 
                key={depId} 
                variant="outline" 
                className={`${isModuleActive(depId) ? "bg-green-50" : "bg-red-50"}`}
              >
                {dep.name}
              </Badge>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className={className}>
      {modules.map((module) => {
        const active = isModuleActive(module.id);
        
        return (
          <Card key={module.id} className={active ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{module.name}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </div>
                <Badge variant="outline" className={getCategoryColor(module.category)}>
                  {module.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="text-sm pb-2">
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Price:</span> ${module.price.toFixed(2)}/month
                </div>
                
                {module.features && (
                  <div>
                    <div className="font-medium mb-1">Features:</div>
                    <ul className="list-disc pl-4 space-y-1">
                      {module.features.map((feature, index) => (
                        <li key={index} className="text-xs">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {renderDependencies(module)}
              </div>
            </CardContent>
            
            <CardFooter>
              {active ? (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => removeModule(module.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  className="w-full" 
                  onClick={() => addModule(module.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ModuleSelector;
