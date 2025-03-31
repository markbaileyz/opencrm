
import React, { createContext, useState } from "react";

// Define the report types
interface Report {
  id: number;
  name: string;
  description: string;
  type: "sales" | "marketing" | "finance" | "appointments" | "patients" | "activity" | "conversion";
  createdAt: string;
  lastRun?: string;
  schedule?: {
    frequency: "daily" | "weekly" | "monthly";
    nextRun: string;
  };
  isFavorite: boolean;
}

// Define the context interface
interface SavedReportsContextType {
  reports: Report[];
  filteredReports: Report[];
  showScheduleForm: number | null;
  setShowScheduleForm: (id: number | null) => void;
  emailReportId: number | null;
  setEmailReportId: (id: number | null) => void;
  handleRunReport: (id: number) => void;
  handleToggleFavorite: (id: number) => void;
  handleDeleteReport: (id: number) => void;
  handleCancelSchedule: (id: number) => void;
  handleScheduleReport: (id: number, frequency: "daily" | "weekly" | "monthly") => void;
  handleEmailReport: (id: number, email: string, message: string) => void;
}

// Create the context
export const SavedReportsContext = createContext<SavedReportsContextType>({
  reports: [],
  filteredReports: [],
  showScheduleForm: null,
  setShowScheduleForm: () => {},
  emailReportId: null,
  setEmailReportId: () => {},
  handleRunReport: () => {},
  handleToggleFavorite: () => {},
  handleDeleteReport: () => {},
  handleCancelSchedule: () => {},
  handleScheduleReport: () => {},
  handleEmailReport: () => {}
});

// Create the provider component
export const SavedReportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sample reports data
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      name: "Monthly Patient Visits",
      description: "Overview of patient visits by department",
      type: "patients",
      createdAt: "2023-08-15",
      lastRun: "2023-09-01",
      isFavorite: true
    },
    {
      id: 2,
      name: "Appointment Conversion Rate",
      description: "Analysis of appointment bookings and completions",
      type: "appointments",
      createdAt: "2023-07-22",
      lastRun: "2023-08-22",
      schedule: {
        frequency: "monthly",
        nextRun: "2023-10-22"
      },
      isFavorite: false
    },
    {
      id: 3,
      name: "Daily Activity Summary",
      description: "Summary of user actions and system events",
      type: "activity",
      createdAt: "2023-09-05",
      isFavorite: true
    },
    {
      id: 4,
      name: "Marketing Campaign Results",
      description: "Performance metrics for email campaigns",
      type: "marketing",
      createdAt: "2023-08-10",
      lastRun: "2023-09-10",
      isFavorite: false
    },
    {
      id: 5,
      name: "Sales Funnel Analysis",
      description: "Conversion metrics across the sales pipeline",
      type: "sales",
      createdAt: "2023-09-01",
      lastRun: "2023-09-15",
      schedule: {
        frequency: "weekly",
        nextRun: "2023-09-22"
      },
      isFavorite: true
    }
  ]);
  
  const [filteredReports, setFilteredReports] = useState<Report[]>(reports);
  const [showScheduleForm, setShowScheduleForm] = useState<number | null>(null);
  const [emailReportId, setEmailReportId] = useState<number | null>(null);
  
  const handleRunReport = (id: number) => {
    console.log(`Running report ${id}`);
    setReports(prev => 
      prev.map(report => 
        report.id === id 
          ? { ...report, lastRun: new Date().toISOString().split('T')[0] } 
          : report
      )
    );
  };
  
  const handleToggleFavorite = (id: number) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id 
          ? { ...report, isFavorite: !report.isFavorite } 
          : report
      )
    );
  };
  
  const handleDeleteReport = (id: number) => {
    setReports(prev => prev.filter(report => report.id !== id));
  };
  
  const handleCancelSchedule = (id: number) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id 
          ? { ...report, schedule: undefined } 
          : report
      )
    );
  };
  
  const handleScheduleReport = (id: number, frequency: "daily" | "weekly" | "monthly") => {
    // Calculate next run date based on frequency
    const now = new Date();
    let nextRun = new Date();
    
    if (frequency === "daily") {
      nextRun.setDate(now.getDate() + 1);
    } else if (frequency === "weekly") {
      nextRun.setDate(now.getDate() + 7);
    } else {
      nextRun.setMonth(now.getMonth() + 1);
    }
    
    const nextRunStr = nextRun.toISOString().split('T')[0];
    
    setReports(prev => 
      prev.map(report => 
        report.id === id 
          ? { ...report, schedule: { frequency, nextRun: nextRunStr } } 
          : report
      )
    );
    
    setShowScheduleForm(null);
  };
  
  const handleEmailReport = (id: number, email: string, message: string) => {
    console.log(`Emailing report ${id} to ${email} with message: ${message}`);
    setEmailReportId(null);
  };
  
  // Update filtered reports when reports change
  React.useEffect(() => {
    setFilteredReports(reports);
  }, [reports]);
  
  return (
    <SavedReportsContext.Provider
      value={{
        reports,
        filteredReports,
        showScheduleForm,
        setShowScheduleForm,
        emailReportId,
        setEmailReportId,
        handleRunReport,
        handleToggleFavorite,
        handleDeleteReport,
        handleCancelSchedule,
        handleScheduleReport,
        handleEmailReport
      }}
    >
      {children}
    </SavedReportsContext.Provider>
  );
};
