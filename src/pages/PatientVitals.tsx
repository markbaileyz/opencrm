
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const PatientVitals = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Patient Vitals</h1>
        <div className="bg-muted/30 p-6 rounded-md text-center">
          <p className="text-lg mb-4">Patient vitals tracking interface coming soon</p>
          <p className="text-sm text-muted-foreground">
            This section will include vital signs, trends, and monitoring tools
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientVitals;
