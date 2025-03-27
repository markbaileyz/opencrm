
import React, { useContext } from "react";
import { SavedReportsContext } from "./SavedReportsContext";
import ReportList from "./ReportList";
import ReportsFilter from "./ReportsFilter";
import ReportsDashboard from "./ReportsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BarChart } from "lucide-react";

const SavedReportsContent: React.FC = () => {
  const {
    filteredReports,
    showScheduleForm,
    setShowScheduleForm,
    handleRunReport,
    handleToggleFavorite,
    handleDeleteReport,
    handleCancelSchedule,
  } = useContext(SavedReportsContext);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Reports List</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="space-y-4">
          <ReportsFilter />
          <ReportList
            reports={filteredReports}
            onRunReport={handleRunReport}
            onToggleFavorite={handleToggleFavorite}
            onDeleteReport={handleDeleteReport}
            onCancelSchedule={handleCancelSchedule}
            showScheduleForm={showScheduleForm}
            setShowScheduleForm={setShowScheduleForm}
          />
        </TabsContent>
        
        <TabsContent value="dashboard">
          <ReportsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedReportsContent;
