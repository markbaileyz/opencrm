
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Star, StarOff, Mail, Trash2, X } from "lucide-react";
import { format } from "date-fns";

interface Report {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  lastRun?: string;
  schedule?: {
    frequency: "daily" | "weekly" | "monthly";
    nextRun: string;
  };
  isFavorite: boolean;
}

interface ReportListProps {
  reports: Report[];
  onRunReport: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onDeleteReport: (id: number) => void;
  onCancelSchedule: (id: number) => void;
  onEmailReport: (id: number) => void;
  showScheduleForm: number | null;
  setShowScheduleForm: (id: number | null) => void;
}

const ReportList: React.FC<ReportListProps> = ({
  reports,
  onRunReport,
  onToggleFavorite,
  onDeleteReport,
  onCancelSchedule,
  onEmailReport,
  showScheduleForm,
  setShowScheduleForm
}) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No reports found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden lg:table-cell">Last Run</TableHead>
            <TableHead className="hidden md:table-cell">Schedule</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map(report => (
            <TableRow key={report.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {report.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell capitalize">{report.type}</TableCell>
              <TableCell className="hidden lg:table-cell">
                {report.lastRun ? (
                  <span>{report.lastRun}</span>
                ) : (
                  <span className="text-muted-foreground">Never</span>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {showScheduleForm === report.id ? (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onCancelSchedule(report.id)}
                    >
                      Daily
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onCancelSchedule(report.id)}
                    >
                      Weekly
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onCancelSchedule(report.id)}
                    >
                      Monthly
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowScheduleForm(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : report.schedule ? (
                  <div className="flex items-center">
                    <span className="capitalize">{report.schedule.frequency}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onCancelSchedule(report.id)}
                      className="ml-2 h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRunReport(report.id)}
                    title="Run Report"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  {!report.schedule && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowScheduleForm(report.id)}
                      title="Schedule Report"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onToggleFavorite(report.id)}
                    title={report.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    {report.isFavorite ? (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onEmailReport(report.id)}
                    title="Email Report"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDeleteReport(report.id)}
                    title="Delete Report"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportList;
