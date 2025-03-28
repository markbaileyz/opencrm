
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, X } from "lucide-react";
import { useCRM } from "@/contexts/CRMContext";
import { CRMModule } from "@/types/crm-modules";
import { CORE_MODULES, INDUSTRY_MODULES } from "@/data/crm-modules";

const ModuleSelector: React.FC = () => {
  const { isModuleActive, addModule, removeModule, getTotalPrice } = useCRM();
  const totalPrice = getTotalPrice();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Configure Your CRM</h1>
          <p className="text-muted-foreground">
            Select the modules you need. Your total monthly price will update automatically.
          </p>
        </div>
        
        <div className="sticky top-4 z-10 mb-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Current Configuration</h3>
                  <div className="text-3xl font-bold">${totalPrice.toFixed(2)}/month</div>
                </div>
                <Button variant="secondary" className="ml-auto">
                  Confirm Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Industry Solutions</h2>
          <p className="text-muted-foreground mb-6">
            Choose your industry-specific solution. These bundles include specialized features tailored for your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {INDUSTRY_MODULES.map((module) => (
              <ModuleCard 
                key={module.id}
                module={module}
                isActive={isModuleActive(module.id)}
                onAdd={() => addModule(module.id)}
                onRemove={() => removeModule(module.id)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Core Modules</h2>
          <p className="text-muted-foreground mb-6">
            Enhance your CRM with these additional modules based on your needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_MODULES.map((module) => (
              <ModuleCard 
                key={module.id}
                module={module}
                isActive={isModuleActive(module.id)}
                onAdd={() => addModule(module.id)}
                onRemove={() => removeModule(module.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModuleCard: React.FC<{
  module: CRMModule;
  isActive: boolean;
  onAdd: () => void;
  onRemove: () => void;
}> = ({ module, isActive, onAdd, onRemove }) => {
  const Icon = module.icon;
  
  return (
    <Card className={`border ${isActive ? "border-primary" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-md ${isActive ? "bg-primary/10" : "bg-muted"} mr-3`}>
              <Icon className={`h-6 w-6 ${isActive ? "text-primary" : ""}`} />
            </div>
            <div>
              <CardTitle className="text-lg">{module.name}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </div>
          </div>
          <Badge variant={isActive ? "default" : "outline"}>
            ${module.price.toFixed(2)}/mo
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <ul className="space-y-2">
          {module.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-1 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isActive ? (
          <Button variant="outline" className="w-full" onClick={onRemove}>
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        ) : (
          <Button className="w-full" onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add to CRM
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ModuleSelector;
