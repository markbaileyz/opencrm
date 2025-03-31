
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { SavedReportsProvider } from "@/components/reports/saved-reports/SavedReportsContext";
import SavedReportsContent from "@/components/reports/saved-reports/SavedReportsContent";
import ReportsDashboard from "@/components/reports/saved-reports/ReportsDashboard";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>
        <SavedReportsProvider>
          <SavedReportsContent />
        </SavedReportsProvider>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
