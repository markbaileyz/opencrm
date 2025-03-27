import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Download, Play, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SavedReport = {
  id: string;
  name: string;
  type: string;
  createdAt: string; 
  lastRun: string;
  isFavorite: boolean;
};

const sampleReports: SavedReport[] = [
  {
    id: "1",
    name: "Monthly Sales Performance",
    type: "sales",
    createdAt: "2023-12-15",
    lastRun: "2024-04-05",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Q1 Lead Source Analysis",
    type: "conversion",
    createdAt: "2024-01-10",
    lastRun: "2024-04-01",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Weekly Contact Activity",
    type: "activity",
    createdAt: "2024-02-22",
    lastRun: "2024-04-10",
    isFavorite: true,
  },
];

const SavedReports = () => {
  const handleRunReport = (id: string) => {
    console.log("Running report", id);
  };

  const handleToggleFavorite = (id: string) => {
    console.log("Toggling favorite for report", id);
  };

  const handleDeleteReport = (id: string) => {
    console.log("Deleting report", id);
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
              className="flex items-center justify-between p-3 bg-muted/40 rounded-md hover:bg-muted/60 transition-colors"
            >
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
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleRunReport(report.id)}>
                  <Play className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedReports;
