
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

const sampleReports: SavedReport[] = [
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
];

const SavedReports = () => {
  const [showScheduleForm, setShowScheduleForm] = useState<string | null>(null);
  const [scheduleEmail, setScheduleEmail] = useState("");
  const [scheduleFrequency, setScheduleFrequency] = useState("weekly");
  const { toast } = useToast();

  const handleRunReport = (id: string) => {
    console.log("Running report", id);
    toast({
      title: "Report running",
      description: "Your report is being generated. This may take a moment.",
    });
  };

  const handleToggleFavorite = (id: string) => {
    console.log("Toggling favorite for report", id);
  };

  const handleDeleteReport = (id: string) => {
    console.log("Deleting report", id);
    toast({
      title: "Report deleted",
      description: "Your report has been permanently deleted.",
      variant: "destructive",
    });
  };

  const handleScheduleReport = (reportId: string) => {
    console.log("Scheduling report", {
      reportId,
      email: scheduleEmail,
      frequency: scheduleFrequency
    });
    
    toast({
      title: "Report scheduled",
      description: `This report will be sent ${scheduleFrequency} to ${scheduleEmail}`,
    });
    
    setShowScheduleForm(null);
    setScheduleEmail("");
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
          {sampleReports.map((report) => (
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
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    Last run: {report.lastRun}
                  </div>
                  
                  {report.schedule && (
                    <div className="text-xs text-primary flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Scheduled: {report.schedule.frequency} to {report.schedule.email}
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
                              value={scheduleFrequency} 
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
                              value={scheduleEmail} 
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedReports;
