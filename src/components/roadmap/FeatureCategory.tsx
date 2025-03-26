
import React from "react";
import FeatureCard from "./FeatureCard";
import { FeatureCategory as FeatureCategoryType } from "@/data/featuresList";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface FeatureCategoryProps {
  category: FeatureCategoryType;
}

const FeatureCategory: React.FC<FeatureCategoryProps> = ({ category }) => {
  // Calculate the percentage of implemented features
  const implementedFeatures = category.features.filter(f => f.implemented).length;
  const totalFeatures = category.features.length;
  const implementationPercentage = Math.round((implementedFeatures / totalFeatures) * 100);
  
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h2 className="text-2xl font-bold pb-2">{category.name}</h2>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-normal">
            {implementedFeatures} of {totalFeatures} implemented
          </Badge>
          <span className="text-sm font-medium">{implementationPercentage}%</span>
        </div>
      </div>
      
      <div className="mb-6">
        <Progress value={implementationPercentage} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.features.map((feature) => (
          <FeatureCard key={feature.name} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default FeatureCategory;
