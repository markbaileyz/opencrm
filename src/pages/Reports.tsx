
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ReportFilters from "@/components/reports/ReportFilters";
import SalesPerformanceReport from "@/components/reports/SalesPerformanceReport";
import DealConversionReport from "@/components/reports/DealConversionReport";
import LeadSourceReport from "@/components/reports/LeadSourceReport";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground mb-6">
            Analyze your CRM data and generate insights
          </p>
        </div>
        
        <ReportFilters />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SalesPerformanceReport />
          
          <div className="space-y-6">
            <DealConversionReport />
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg. Deal Size</span>
                    <span className="font-medium">$12,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sales Cycle</span>
                    <span className="font-medium">32 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Revenue Growth</span>
                    <span className="font-medium text-green-500">+18%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LeadSourceReport />
          <Card>
            <CardHeader>
              <CardTitle>Activity Report</CardTitle>
              <CardDescription>User engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Emails Sent</p>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                  <span className="text-2xl font-bold">248</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Meetings Scheduled</p>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                  <span className="text-2xl font-bold">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Tasks Completed</p>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                  <span className="text-2xl font-bold">156</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
