
import React, { useContext } from "react";
import { SavedReportsContext } from "./SavedReportsContext";
import ReportList from "./ReportList";

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
    <ReportList
      reports={reports}
      onRunReport={handleRunReport}
      onToggleFavorite={handleToggleFavorite}
      onDeleteReport={handleDeleteReport}
      onCancelSchedule={handleCancelSchedule}
      showScheduleForm={showScheduleForm}
      setShowScheduleForm={setShowScheduleForm}
    />
  );
};

export default SavedReportsContent;
