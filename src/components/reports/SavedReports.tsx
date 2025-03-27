
import React, { useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SavedReportsProvider, SavedReportsContext } from "./saved-reports/SavedReportsContext";
import ReportList from "./saved-reports/ReportList";

const SavedReportsContent: React.FC = () => {
  const {
    reports,
    showScheduleForm,
    setShowScheduleForm,
    handleRunReport,
    handleToggleFavorite,
    handleDeleteReport,
    handleCancelSchedule,
  } = useContext(SavedReportsContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Reports</CardTitle>
        <CardDescription>
          Your saved and scheduled reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReportList
          reports={reports}
          onRunReport={handleRunReport}
          onToggleFavorite={handleToggleFavorite}
          onDeleteReport={handleDeleteReport}
          onCancelSchedule={handleCancelSchedule}
          showScheduleForm={showScheduleForm}
          setShowScheduleForm={setShowScheduleForm}
        />
      </CardContent>
    </Card>
  );
};

const SavedReports: React.FC = () => {
  return (
    <SavedReportsProvider>
      <SavedReportsContent />
    </SavedReportsProvider>
  );
};

export default SavedReports;
