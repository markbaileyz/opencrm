
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, Download, Play, Star, Trash2, Calendar, Mail } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ScheduleForm from "./ScheduleForm";
import { SavedReport } from "./types";
import { Badge } from "@/components/ui/badge";

interface ReportItemProps {
  report: SavedReport;
  onRunReport: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteReport: (id: string) => void;
  onCancelSchedule: (id: string) => void;
  onEmailReport?: (id: string) => void;
  showScheduleForm: string | null;
  setShowScheduleForm: (id: string | null) => void;
}

const ReportItem: React.FC<ReportItemProps> = ({
  report,
  onRunReport,
  onToggleFavorite,
  onDeleteReport,
  onCancelSchedule,
  onEmailReport,
  showScheduleForm,
  setShowScheduleForm,
}) => {
  // Get report type color
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "sales":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "conversion":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "activity":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "performance":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

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
            <Badge className={`font-normal ${getTypeColor(report.type)}`}>
              {report.type}
            </Badge>
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
          {onEmailReport && (
            <Button variant="ghost" size="icon" onClick={() => onEmailReport(report.id)}>
              <Mail className="h-4 w-4" />
            </Button>
          )}
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
