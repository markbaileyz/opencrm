
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Calendar, FileText, PieChart, Star } from "lucide-react";
import { useContext } from "react";
import { SavedReportsContext } from "./SavedReportsContext";

const ReportsDashboard: React.FC = () => {
  const { reports } = useContext(SavedReportsContext);
  
  // Calculate some statistics for the dashboard
  const totalReports = reports.length;
  const favoriteReports = reports.filter(r => r.isFavorite).length;
  const scheduledReports = reports.filter(r => r.schedule).length;
  
  // Group reports by type
  const reportsByType = reports.reduce((acc, report) => {
    acc[report.type] = (acc[report.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate percentages for the most common report types
  const reportTypeData = Object.entries(reportsByType).map(([type, count]) => ({
    type,
    count,
    percentage: totalReports > 0 ? Math.round((count / totalReports) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{totalReports}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Favorite Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-2xl font-bold">{favoriteReports}</span>
            </div>
            <Progress 
              value={totalReports > 0 ? (favoriteReports / totalReports) * 100 : 0} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{scheduledReports}</span>
            </div>
            <Progress 
              value={totalReports > 0 ? (scheduledReports / totalReports) * 100 : 0} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>
      </div>
      
      {totalReports > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Report Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reportTypeData.map(({ type, count, percentage }) => (
                <div key={type} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {type === 'sales' && <BarChart className="h-4 w-4 mr-2 text-primary" />}
                      {type === 'conversion' && <PieChart className="h-4 w-4 mr-2 text-primary" />}
                      {type === 'activity' && <Calendar className="h-4 w-4 mr-2 text-primary" />}
                      <span className="text-sm capitalize">{type}</span>
                    </div>
                    <span className="text-sm font-medium">{count} ({percentage}%)</span>
                  </div>
                  <Progress value={percentage} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsDashboard;
