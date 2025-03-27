
import React from "react";
import ReportItem from "./ReportItem";
import { SavedReport } from "./types";
import { AlertTriangle } from "lucide-react";

interface ReportListProps {
  reports: SavedReport[];
  onRunReport: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteReport: (id: string) => void;
  onCancelSchedule: (id: string) => void;
  onEmailReport?: (id: string) => void;
  showScheduleForm: string | null;
  setShowScheduleForm: (id: string | null) => void;
}

const ReportList: React.FC<ReportListProps> = ({
  reports,
  onRunReport,
  onToggleFavorite,
  onDeleteReport,
  onCancelSchedule,
  onEmailReport,
  showScheduleForm,
  setShowScheduleForm,
}) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md bg-muted/30">
        <AlertTriangle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="font-medium">No saved reports found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Save a report from the reports section to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <ReportItem
          key={report.id}
          report={report}
          onRunReport={onRunReport}
          onToggleFavorite={onToggleFavorite}
          onDeleteReport={onDeleteReport}
          onCancelSchedule={onCancelSchedule}
          onEmailReport={onEmailReport}
          showScheduleForm={showScheduleForm}
          setShowScheduleForm={setShowScheduleForm}
        />
      ))}
    </div>
  );
};

export default ReportList;
