
import React, { useState } from "react";
import { featuresList } from "@/data/featuresList";
import FeatureFilters, { FilterType } from "./roadmap/FeatureFilters";
import FeatureCategory from "./roadmap/FeatureCategory";

const CRMFeaturesList = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  
  const filteredFeaturesList = featuresList.map(category => ({
    ...category,
    features: category.features.filter(feature => {
      if (filter === "all") return true;
      if (filter === "implemented") return feature.implemented;
      if (filter === "coming-soon") return feature.comingSoon;
      return true;
    })
  })).filter(category => category.features.length > 0);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">NextCRM Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our planned features and current development status. We're constantly
          improving NextCRM to meet your business needs.
        </p>
      </div>

      <FeatureFilters filter={filter} setFilter={setFilter} />

      {filteredFeaturesList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No features found matching the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {filteredFeaturesList.map((category) => (
            <FeatureCategory key={category.name} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CRMFeaturesList;
