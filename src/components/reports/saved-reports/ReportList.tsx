
import React, { useState } from "react";
import ReportItem from "./ReportItem";
import { SavedReport } from "./types";
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, MoveDown, MoveUp, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

type SortField = "name" | "type" | "lastRun" | "createdAt";
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 5;

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
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>("lastRun");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE);

  // Sort the reports
  const sortedReports = [...reports].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortField) {
      case "name":
        aValue = a.name;
        bValue = b.name;
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      
      case "type":
        aValue = a.type;
        bValue = b.type;
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      
      case "lastRun":
        aValue = new Date(a.lastRun);
        bValue = new Date(b.lastRun);
        return sortOrder === "asc" 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime();
      
      case "createdAt":
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        return sortOrder === "asc" 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime();
      
      default:
        return 0;
    }
  });

  // Get current page items
  const currentReports = sortedReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle select all
  const handleSelectAll = () => {
    if (selectedReports.length === currentReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(currentReports.map(report => report.id));
    }
  };

  // Handle individual select
  const handleSelectReport = (id: string) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter(reportId => reportId !== id));
    } else {
      setSelectedReports([...selectedReports, id]);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    selectedReports.forEach(id => onDeleteReport(id));
    setSelectedReports([]);
  };

  // Toggle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Handle pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
    setSelectedReports([]);
  };

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
      {/* List Header with Sort Controls */}
      <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={selectedReports.length === currentReports.length && currentReports.length > 0}
            onCheckedChange={handleSelectAll}
            aria-label="Select all reports"
          />
          <span className="text-sm font-medium">
            {selectedReports.length > 0 ? `${selectedReports.length} selected` : "Select all"}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedReports.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-destructive"
              onClick={handleBulkDelete}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Selected
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sort by: {sortField} {sortOrder === "asc" ? <MoveUp className="h-3 w-3 ml-1" /> : <MoveDown className="h-3 w-3 ml-1" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSort("name")}>
                Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("type")}>
                Type {sortField === "type" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("lastRun")}>
                Last Run {sortField === "lastRun" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("createdAt")}>
                Created Date {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Report Items */}
      {currentReports.map((report) => (
        <div key={report.id} className="flex gap-2 items-start">
          <div className="pt-3 pl-1">
            <Checkbox 
              checked={selectedReports.includes(report.id)}
              onCheckedChange={() => handleSelectReport(report.id)}
              aria-label={`Select ${report.name}`}
            />
          </div>
          <div className="flex-1">
            <ReportItem
              report={report}
              onRunReport={onRunReport}
              onToggleFavorite={onToggleFavorite}
              onDeleteReport={onDeleteReport}
              onCancelSchedule={onCancelSchedule}
              onEmailReport={onEmailReport}
              showScheduleForm={showScheduleForm}
              setShowScheduleForm={setShowScheduleForm}
            />
          </div>
        </div>
      ))}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-2">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, reports.length)} of {reports.length} reports
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportList;
