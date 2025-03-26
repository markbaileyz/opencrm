
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Feature } from "@/data/featuresList";
import { Check, Clock } from "lucide-react";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <Card className="transition-all hover:shadow-md hover:scale-[1.02] duration-200 animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{feature.name}</CardTitle>
          {feature.implemented && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
              <Check className="h-3 w-3" />
              Implemented
            </span>
          )}
          {feature.comingSoon && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
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
