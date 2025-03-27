
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, Download, Play, Star, Trash2, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ScheduleForm from "./ScheduleForm";
import { SavedReport } from "./types";

interface ReportItemProps {
  report: SavedReport;
  onRunReport: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteReport: (id: string) => void;
  onCancelSchedule: (id: string) => void;
  showScheduleForm: string | null;
  setShowScheduleForm: (id: string | null) => void;
}

const ReportItem: React.FC<ReportItemProps> = ({
  report,
  onRunReport,
  onToggleFavorite,
  onDeleteReport,
  onCancelSchedule,
  showScheduleForm,
  setShowScheduleForm,
}) => {
  return (
    <div className="flex flex-col p-3 bg-muted/40 rounded-md hover:bg-muted/60 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onToggleFavorite(report.id)}
            >
              <Star 
                className={cn(
                  "h-4 w-4", 
                  report.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                )} 
              />
            </Button>
            <h4 className="font-medium">{report.name}</h4>
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
              {report.type}
            </span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center mt-1">
            <Clock className="h-3 w-3 mr-1" />
            Last run: {report.lastRun}
          </div>
          
          {report.schedule && (
            <div className="text-xs text-primary flex items-center mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              Scheduled: {report.schedule.frequency} to {report.schedule.email}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 px-1 text-xs text-muted-foreground hover:text-destructive ml-2"
                onClick={() => onCancelSchedule(report.id)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => onRunReport(report.id)}>
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Popover open={showScheduleForm === report.id} onOpenChange={() => setShowScheduleForm(showScheduleForm === report.id ? null : report.id)}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Calendar className={cn("h-4 w-4", report.schedule && "text-primary")} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <ScheduleForm
                report={report}
                reportId={report.id}
              />
            </PopoverContent>
          </Popover>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-destructive"
            onClick={() => onDeleteReport(report.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;
