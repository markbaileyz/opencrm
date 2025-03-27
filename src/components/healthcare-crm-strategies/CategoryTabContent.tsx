
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryTabContentProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  essentialFields: string[];
  advancedFeatures: string[];
}

const CategoryTabContent: React.FC<CategoryTabContentProps> = ({
  icon,
  title,
  description,
  essentialFields,
  advancedFeatures
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium">Essential Fields</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {essentialFields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Advanced Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {advancedFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryTabContent;
