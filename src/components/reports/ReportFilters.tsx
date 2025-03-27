
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Download, RefreshCw, Save, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Input } from "@/components/ui/input";

const ReportFilters = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [timePeriod, setTimePeriod] = useState("thisMonth");
  const [reportType, setReportType] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reportName, setReportName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleSaveReport = () => {
    console.log("Saving report:", {
      name: reportName,
      type: reportType,
      timePeriod,
      dateRange: timePeriod === "custom" ? dateRange : null,
    });
    setShowSaveDialog(false);
    setReportName("");
  };

  return (
    <div className="flex flex-col gap-4 bg-muted/30 p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {timePeriod === "custom" && (
          <div className="w-full md:w-1/4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        <div className="w-full md:w-1/4">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
              <SelectItem value="activity">Activity</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh Data
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSaveDialog(!showSaveDialog)}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Report
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Generate PDF
          </Button>
        </div>
      </div>

      {showSaveDialog && (
        <div className="bg-background border rounded-md p-4 mt-2">
          <h3 className="text-sm font-medium mb-2">Save Current Report</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Report name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSaveReport}>
              Save
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;
