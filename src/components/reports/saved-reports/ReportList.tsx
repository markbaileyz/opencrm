
import React from "react";
import ReportItem from "./ReportItem";
import { SavedReport } from "./types";

interface ReportListProps {
  reports: SavedReport[];
  onRunReport: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteReport: (id: string) => void;
  onCancelSchedule: (id: string) => void;
  showScheduleForm: string | null;
  setShowScheduleForm: (id: string | null) => void;
}

const ReportList: React.FC<ReportListProps> = ({
  reports,
  onRunReport,
  onToggleFavorite,
  onDeleteReport,
  onCancelSchedule,
  showScheduleForm,
  setShowScheduleForm,
}) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No saved reports found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Save a report from the reports section to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <ReportItem
          key={report.id}
          report={report}
          onRunReport={onRunReport}
          onToggleFavorite={onToggleFavorite}
          onDeleteReport={onDeleteReport}
          onCancelSchedule={onCancelSchedule}
          showScheduleForm={showScheduleForm}
          setShowScheduleForm={setShowScheduleForm}
        />
      ))}
    </div>
  );
};

export default ReportList;
