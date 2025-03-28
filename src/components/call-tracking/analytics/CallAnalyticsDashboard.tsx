
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CallRecord } from "@/types/call";
import CallMetricsCard from "./CallMetricsCard";
import CallVolumeChart from "./CallVolumeChart";
import CallTypeDistribution from "./CallTypeDistribution";
import TopCallersTable from "./TopCallersTable";

interface CallAnalyticsDashboardProps {
  calls: CallRecord[];
}

const CallAnalyticsDashboard: React.FC<CallAnalyticsDashboardProps> = ({ calls }) => {
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month" | "quarter">("week");
  
  // Calculate metrics
  const totalCalls = calls.length;
  const incomingCalls = calls.filter(call => call.type === "incoming").length;
  const outgoingCalls = calls.filter(call => call.type === "outgoing").length;
  const missedCalls = calls.filter(call => call.type === "missed").length;
  
  // Calculate average duration (excluding missed calls)
  const validCalls = calls.filter(call => call.type !== "missed" && call.duration);
  const averageDuration = validCalls.length 
    ? Math.round(validCalls.reduce((sum, call) => sum + (call.duration || 0), 0) / validCalls.length) 
    : 0;
  
  // Calculate follow-up rate
  const callsWithFollowUp = calls.filter(call => call.followUp).length;
  const followUpRate = totalCalls ? Math.round((callsWithFollowUp / totalCalls) * 100) : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Call Analytics</h2>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="quarter">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CallMetricsCard
          title="Total Calls"
          value={totalCalls}
          trend="up"
          trendValue={12}
          icon="phone"
          description={`Total calls in the last ${timeRange === "today" ? "24 hours" : timeRange === "week" ? "7 days" : timeRange === "month" ? "30 days" : "90 days"}`}
        />
        <CallMetricsCard
          title="Incoming Calls"
          value={incomingCalls}
          trend="up"
          trendValue={8}
          icon="phone-incoming"
          description="Number of calls received"
        />
        <CallMetricsCard
          title="Average Duration"
          value={`${Math.floor(averageDuration / 60)}m ${averageDuration % 60}s`}
          trend="down"
          trendValue={5}
          icon="clock"
          description="Average call length"
        />
        <CallMetricsCard
          title="Follow-up Rate"
          value={`${followUpRate}%`}
          trend="up"
          trendValue={3}
          icon="calendar"
          description="Percentage of calls with follow-up"
        />
      </div>
      
      <Tabs defaultValue="volume" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="volume">Call Volume</TabsTrigger>
          <TabsTrigger value="distribution">Call Types</TabsTrigger>
          <TabsTrigger value="callers">Top Callers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="volume">
          <Card>
            <CardHeader>
              <CardTitle>Call Volume Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <CallVolumeChart calls={calls} timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Call Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <CallTypeDistribution calls={calls} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="callers">
          <Card>
            <CardHeader>
              <CardTitle>Top Callers</CardTitle>
            </CardHeader>
            <CardContent>
              <TopCallersTable calls={calls} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallAnalyticsDashboard;
