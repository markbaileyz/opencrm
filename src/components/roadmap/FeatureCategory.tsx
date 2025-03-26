
import React from "react";
import FeatureCard from "./FeatureCard";
import { FeatureCategory as FeatureCategoryType } from "@/data/featuresList";

interface FeatureCategoryProps {
  category: FeatureCategoryType;
}

const FeatureCategory: React.FC<FeatureCategoryProps> = ({ category }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">{category.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.features.map((feature) => (
          <FeatureCard key={feature.name} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default FeatureCategory;
