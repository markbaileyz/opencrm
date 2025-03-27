
import React from "react";
import CategoryTabs from "./CategoryTabs";
import EnhancementsSection from "./EnhancementsSection";

const HealthcareCRMStrategies = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Healthcare CRM Essentials
        </h1>
        <p className="text-lg text-muted-foreground">
          Effective healthcare customer relationship management requires capturing comprehensive data across multiple domains. Here's what a robust healthcare CRM should include:
        </p>
      </div>

      <CategoryTabs />
      <EnhancementsSection />
    </div>
  );
};

export default HealthcareCRMStrategies;
