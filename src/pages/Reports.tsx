
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ReportFilters from "@/components/reports/ReportFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Filter, BarChart3, PieChart, TrendingUp, Users, Tags, Calendar } from "lucide-react";
import SalesPerformanceReport from "@/components/reports/SalesPerformanceReport";
import LeadSourceReport from "@/components/reports/LeadSourceReport";
import DealConversionReport from "@/components/reports/DealConversionReport";
import SalesForecastReport from "@/components/reports/SalesForecastReport";
import { useToast } from "@/hooks/use-toast";
import ContactActivityReport from "@/components/reports/ContactActivityReport";
import PipelineAnalysisReport from "@/components/reports/PipelineAnalysisReport";
import ReportHeader from "@/components/reports/ReportHeader";
import ReportExportOptions from "@/components/reports/ReportExportOptions";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("sales-performance");
  const [showFilters, setShowFilters] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const { toast } = useToast();

  const handleExport = (format: string) => {
    toast({
      title: "Report exported",
      description: `Your report has been exported as ${format.toUpperCase()}.`,
    });
    setShowExportOptions(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ReportHeader 
          title="Analytics & Reports"
          description="Comprehensive analytics and reports to track your business performance."
        />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <TabsTrigger value="sales-performance" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Sales Performance</span>
              </TabsTrigger>
              <TabsTrigger value="lead-source" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Lead Sources</span>
              </TabsTrigger>
              <TabsTrigger value="deal-conversion" className="flex items-center gap-2">
                <Tags className="h-4 w-4" />
                <span className="hidden sm:inline">Deal Conversion</span>
              </TabsTrigger>
              <TabsTrigger value="sales-forecast" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Sales Forecast</span>
              </TabsTrigger>
              <TabsTrigger value="contact-activity" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Contact Activity</span>
              </TabsTrigger>
              <TabsTrigger value="pipeline-analysis" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Pipeline Analysis</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {showFilters && <ReportFilters />}
        
        {showExportOptions && (
          <ReportExportOptions onExport={handleExport} onCancel={() => setShowExportOptions(false)} />
        )}

        <div className="bg-card rounded-lg border shadow">
          <TabsContent value="sales-performance" className="m-0">
            <SalesPerformanceReport />
          </TabsContent>

          <TabsContent value="lead-source" className="m-0">
            <LeadSourceReport />
          </TabsContent>

          <TabsContent value="deal-conversion" className="m-0">
            <DealConversionReport />
          </TabsContent>

          <TabsContent value="sales-forecast" className="m-0">
            <SalesForecastReport />
          </TabsContent>

          <TabsContent value="contact-activity" className="m-0">
            <ContactActivityReport />
          </TabsContent>

          <TabsContent value="pipeline-analysis" className="m-0">
            <PipelineAnalysisReport />
          </TabsContent>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
