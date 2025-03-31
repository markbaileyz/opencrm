
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CRMModule } from "@/types/crm-modules";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  module: CRMModule;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  // Get the module's icon
  const Icon = module.icon;
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {Icon && React.createElement(Icon, { className: "h-5 w-5 mr-2 text-primary", "aria-hidden": "true" })}
            <CardTitle className="text-base">{module.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="text-sm text-muted-foreground mb-2 flex-grow">
          {module.description}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Badge variant="outline">${module.price.toFixed(2)}/mo</Badge>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/crm/${module.id}`} className="flex items-center">
              Open <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
