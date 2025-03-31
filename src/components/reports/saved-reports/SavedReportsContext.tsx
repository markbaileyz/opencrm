import React, { createContext, useState, ReactNode, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { SavedReport } from "./types";

interface SavedReportsContextProps {
  reports: SavedReport[];
  filteredReports: SavedReport[];
  filterText: string;
  setFilterText: (text: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  showScheduledOnly: boolean;
  setShowScheduledOnly: (show: boolean) => void;
  clearFilters: () => void;
  showScheduleForm: string | null;
  setShowScheduleForm: (id: string | null) => void;
  emailReportId: string | null;
  setEmailReportId: (id: string | null) => void;
  handleRunReport: (id: string) => void;
  handleToggleFavorite: (id: string) => void;
  handleDeleteReport: (id: string) => void;
  handleScheduleReport: (reportId: string, email: string, frequency: string) => void;
  handleCancelSchedule: (reportId: string) => void;
  handleEmailReport: (reportId: string, email: string) => void;
}

export const SavedReportsContext = createContext<SavedReportsContextProps>({
  reports: [],
  filteredReports: [],
  filterText: "",
  setFilterText: () => {},
  showFavoritesOnly: false,
  setShowFavoritesOnly: () => {},
  showScheduledOnly: false,
  setShowScheduledOnly: () => {},
  clearFilters: () => {},
  showScheduleForm: null,
  setShowScheduleForm: () => {},
  emailReportId: null,
  setEmailReportId: () => {},
  handleRunReport: () => {},
  handleToggleFavorite: () => {},
  handleDeleteReport: () => {},
  handleScheduleReport: () => {},
  handleCancelSchedule: () => {},
  handleEmailReport: () => {},
});

interface SavedReportsProviderProps {
  children: ReactNode;
}

export const SavedReportsProvider: React.FC<SavedReportsProviderProps> = ({ children }) => {
  const [reports, setReports] = useState<SavedReport[]>([
    {
      id: "1",
      name: "Monthly Sales Performance",
      type: "sales",
      createdAt: "2023-12-15",
      lastRun: "2024-04-05",
      isFavorite: true,
      schedule: {
        frequency: "monthly",
        email: "team@example.com",
        lastSent: "2024-04-01"
      }
    },
    {
      id: "2",
      name: "Q1 Lead Source Analysis",
      type: "conversion",
      createdAt: "2024-01-10",
      lastRun: "2024-04-01",
      isFavorite: false
    },
    {
      id: "3",
      name: "Weekly Contact Activity",
      type: "activity",
      createdAt: "2024-02-22",
      lastRun: "2024-04-10",
      isFavorite: true,
      schedule: {
        frequency: "weekly",
        email: "marketing@example.com",
        lastSent: "2024-04-08"
      }
    },
    {
      id: "4",
      name: "Deal Conversion Rates",
      type: "conversion",
      createdAt: "2024-03-05",
      lastRun: "2024-04-07",
      isFavorite: false,
      schedule: {
        frequency: "bi-weekly",
        email: "sales@example.com",
        lastSent: "2024-04-05"
      }
    },
    {
      id: "5",
      name: "Customer Retention Analysis",
      type: "sales",
      createdAt: "2024-02-10",
      lastRun: "2024-04-03",
      isFavorite: true
    }
  ]);
  
  const [showScheduleForm, setShowScheduleForm] = useState<string | null>(null);
  const [emailReportId, setEmailReportId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showScheduledOnly, setShowScheduledOnly] = useState(false);
  const { toast } = useToast();

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesText = filterText === "" || 
        report.name.toLowerCase().includes(filterText.toLowerCase()) ||
        report.type.toLowerCase().includes(filterText.toLowerCase());
      
      const matchesFavorite = !showFavoritesOnly || report.isFavorite;
      const matchesScheduled = !showScheduledOnly || !!report.schedule;
      
      return matchesText && matchesFavorite && matchesScheduled;
    });
  }, [reports, filterText, showFavoritesOnly, showScheduledOnly]);

  const clearFilters = () => {
    setFilterText("");
    setShowFavoritesOnly(false);
    setShowScheduledOnly(false);
  };

  const handleRunReport = (id: string) => {
    console.log("Running report", id);
    
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id 
          ? { ...report, lastRun: new Date().toISOString().split('T')[0] } 
          : report
      )
    );
    
    toast({
      title: "Report running",
      description: "Your report is being generated. This may take a moment.",
    });
  };

  const handleToggleFavorite = (id: string) => {
    console.log("Toggling favorite for report", id);
    
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id 
          ? { ...report, isFavorite: !report.isFavorite } 
          : report
      )
    );
    
    const report = reports.find(r => r.id === id);
    if (report) {
      toast({
        title: report.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: `"${report.name}" has been ${report.isFavorite ? "removed from" : "added to"} your favorites.`,
      });
    }
  };

  const handleDeleteReport = (id: string) => {
    console.log("Deleting report", id);
    
    const reportToDelete = reports.find(r => r.id === id);
    if (!reportToDelete) return;
    
    setReports(prevReports => prevReports.filter(report => report.id !== id));
    
    toast({
      title: "Report deleted",
      description: `"${reportToDelete.name}" has been permanently deleted.`,
      variant: "destructive",
    });
  };

  const handleScheduleReport = (reportId: string, email: string, frequency: string) => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address to schedule this report.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Scheduling report", {
      reportId,
      email,
      frequency
    });
    
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { 
              ...report, 
              schedule: {
                frequency,
                email,
                lastSent: new Date().toISOString().split('T')[0]
              }
            } 
          : report
      )
    );
    
    toast({
      title: "Report scheduled",
      description: `This report will be sent ${frequency} to ${email}`,
    });
    
    setShowScheduleForm(null);
  };

  const handleCancelSchedule = (reportId: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, schedule: undefined } 
          : report
      )
    );
    
    toast({
      title: "Schedule cancelled",
      description: "The report schedule has been cancelled.",
    });
  };

  const handleEmailReport = (reportId: string, email: string) => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send this report.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Emailing report", {
      reportId,
      email
    });
    
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, lastRun: new Date().toISOString().split('T')[0] } 
          : report
      )
    );
    
    toast({
      title: "Report sent",
      description: `The report has been sent to ${email}`,
    });
    
    setEmailReportId(null);
  };

  const value = {
    reports,
    filteredReports,
    filterText,
    setFilterText,
    showFavoritesOnly,
    setShowFavoritesOnly,
    showScheduledOnly,
    setShowScheduledOnly,
    clearFilters,
    showScheduleForm,
    setShowScheduleForm,
    emailReportId,
    setEmailReportId,
    handleRunReport,
    handleToggleFavorite,
    handleDeleteReport,
    handleScheduleReport,
    handleCancelSchedule,
    handleEmailReport,
  };

  return (
    <SavedReportsContext.Provider value={value}>
      {children}
    </SavedReportsContext.Provider>
  );
};
