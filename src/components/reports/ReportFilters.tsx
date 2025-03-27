
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const ReportFilters = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-muted/30 p-4 rounded-lg mb-6">
      <div className="w-full md:w-1/4">
        <Select defaultValue="thisMonth">
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
      
      <div className="w-full md:w-1/4">
        <Select defaultValue="all">
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
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Report
        </Button>
        <Button size="sm">Generate PDF</Button>
      </div>
    </div>
  );
};

export default ReportFilters;
