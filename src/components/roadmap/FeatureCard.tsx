
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Feature } from "@/data/featuresList";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{feature.name}</CardTitle>
          {feature.implemented && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Implemented
            </span>
          )}
          {feature.comingSoon && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Coming Soon
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
