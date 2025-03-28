
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ComplianceOverview from "@/components/compliance/ComplianceOverview";

const Compliance: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <ComplianceOverview />
      </div>
    </DashboardLayout>
  );
};

export default Compliance;
