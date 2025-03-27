
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Download, Play, Star, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type SavedReport = {
  id: string;
  name: string;
  type: string;
  createdAt: string; 
  lastRun: string;
  isFavorite: boolean;
  schedule?: {
    frequency: string;
    email: string;
    lastSent?: string;
  };
};

const SavedReports = () => {
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
  ]);
  
  const [showScheduleForm, setShowScheduleForm] = useState<string | null>(null);
  const [scheduleEmail, setScheduleEmail] = useState("");
  const [scheduleFrequency, setScheduleFrequency] = useState("weekly");
  const { toast } = useToast();

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

  const handleScheduleReport = (reportId: string) => {
    if (!scheduleEmail) {
      toast({
        title: "Email required",
        description: "Please enter an email address to schedule this report.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Scheduling report", {
      reportId,
      email: scheduleEmail,
      frequency: scheduleFrequency
    });
    
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { 
              ...report, 
              schedule: {
                frequency: scheduleFrequency,
                email: scheduleEmail,
                lastSent: new Date().toISOString().split('T')[0]
              }
            } 
          : report
      )
    );
    
    toast({
      title: "Report scheduled",
      description: `This report will be sent ${scheduleFrequency} to ${scheduleEmail}`,
    });
    
    setShowScheduleForm(null);
    setScheduleEmail("");
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Reports</CardTitle>
        <CardDescription>
          Your saved and scheduled reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No saved reports found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Save a report from the reports section to see it here
              </p>
            </div>
          ) : (
            reports.map((report) => (
              <div 
                key={report.id} 
                className="flex flex-col p-3 bg-muted/40 rounded-md hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleToggleFavorite(report.id)}
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
                          onClick={() => handleCancelSchedule(report.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleRunReport(report.id)}>
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
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Schedule Report</h4>
                          <div className="space-y-2">
                            <div>
                              <label className="text-xs text-muted-foreground">Frequency</label>
                              <Select 
                                value={report.schedule?.frequency || scheduleFrequency} 
                                onValueChange={setScheduleFrequency}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">Monthly</SelectItem>
                                  <SelectItem value="quarterly">Quarterly</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Email</label>
                              <Input 
                                placeholder="Email recipients" 
                                value={report.schedule?.email || scheduleEmail} 
                                onChange={(e) => setScheduleEmail(e.target.value)} 
                              />
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleScheduleReport(report.id)}
                            >
                              Save Schedule
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive"
                      onClick={() => handleDeleteReport(report.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedReports;
