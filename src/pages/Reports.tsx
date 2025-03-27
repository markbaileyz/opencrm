
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ReportHeader from "@/components/reports/ReportHeader";
import LeadSourceReport from "@/components/reports/LeadSourceReport";
import SalesPerformanceReport from "@/components/reports/SalesPerformanceReport";
import PipelineAnalysisReport from "@/components/reports/PipelineAnalysisReport";
import ContactActivityReport from "@/components/reports/ContactActivityReport";
import DealConversionReport from "@/components/reports/DealConversionReport";
import SalesForecastReport from "@/components/reports/SalesForecastReport";
import ReportFilters from "@/components/reports/ReportFilters";
import SavedReports from "@/components/reports/SavedReports";
import { useOfflineState } from "@/hooks/use-offline-state";
import OfflineBanner from "@/components/ui/offline-banner";

// Define filter types
interface ReportFilter {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  reportType: string;
  groupBy: string;
  includeArchived: boolean;
}

const Reports = () => {
  const [activeTab, setActiveTab] = useState("leadSource");
  const [viewSaved, setViewSaved] = useState(false);
  const { isOnline, pendingActions } = useOfflineState();
  
  const [filters, setFilters] = useState<ReportFilter>({
    dateRange: {
      from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      to: new Date(),
    },
    reportType: "all",
    groupBy: "month",
    includeArchived: false,
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<ReportFilter>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const renderActiveReport = () => {
    const props = {
      filters,
      isOnline
    };

    switch (activeTab) {
      case "leadSource":
        return <LeadSourceReport {...props} />;
      case "salesPerformance":
        return <SalesPerformanceReport {...props} />;
      case "pipelineAnalysis":
        return <PipelineAnalysisReport {...props} />;
      case "contactActivity":
        return <ContactActivityReport {...props} />;
      case "dealConversion":
        return <DealConversionReport {...props} />;
      case "salesForecast":
        return <SalesForecastReport {...props} />;
      default:
        return <LeadSourceReport {...props} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <ReportHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          viewSaved={viewSaved}
          setViewSaved={setViewSaved}
        />
        
        {(!isOnline || pendingActions > 0) && (
          <div className="mb-6">
            <OfflineBanner isOnline={isOnline} pendingActions={pendingActions} />
          </div>
        )}
        
        {viewSaved ? (
          <SavedReports />
        ) : (
          <div className="space-y-6">
            <ReportFilters 
              filters={filters} 
              onFilterChange={handleFilterChange}
            />
            
            {!isOnline && (
              <div className="rounded-lg bg-muted p-4 text-sm mb-4">
                <p className="font-medium">Limited functionality in offline mode</p>
                <p className="text-muted-foreground">
                  Some report data may be unavailable or incomplete while offline.
                  Only cached data will be displayed.
                </p>
              </div>
            )}
            
            <div className="bg-background rounded-lg border shadow-sm">
              {renderActiveReport()}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
