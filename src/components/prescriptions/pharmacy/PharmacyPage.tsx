
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import PharmacyIntegration from "./PharmacyIntegration";

const PharmacyPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Pharmacy Integration</h1>
        <p className="text-muted-foreground">
          Manage pharmacy connections and prescription transmissions
        </p>
        
        <PharmacyIntegration />
      </div>
    </DashboardLayout>
  );
};

export default PharmacyPage;
