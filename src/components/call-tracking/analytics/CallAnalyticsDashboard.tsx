
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { DownloadIcon, Phone, CalendarDays, Clock, Users, PhoneCall, CalendarClock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CallVolumeMetric from "./CallVolumeMetric";
import CallDurationMetric from "./CallDurationMetric";
import CallTypeDistribution from "./CallTypeDistribution";
import TopCallersList from "./TopCallersList";
import { CallRecord } from "@/types/call";

interface CallAnalyticsDashboardProps {
  calls: CallRecord[];
  timeRange?: "day" | "week" | "month" | "quarter" | "year";
  onTimeRangeChange?: (range: string) => void;
}

const CallAnalyticsDashboard: React.FC<CallAnalyticsDashboardProps> = ({
  calls,
  timeRange = "week",
  onTimeRangeChange
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Handler for exporting reports
  const handleExportData = (format: "csv" | "pdf" | "excel") => {
    toast({
      title: "Export Initiated",
      description: `Your call analytics are being exported as ${format.toUpperCase()}`,
    });
  };

  // Calculate call metrics
  const totalCalls = calls.length;
  const inboundCalls = calls.filter(call => call.direction === "inbound").length;
  const outboundCalls = calls.filter(call => call.direction === "outbound").length;
  const avgDuration = calls.length > 0 
    ? Math.round(calls.reduce((sum, call) => sum + call.duration, 0) / calls.length) 
    : 0;
  const missedCalls = calls.filter(call => call.status === "missed").length;
  const scheduledFollowUps = calls.filter(call => call.followUp && call.followUp.status === "pending").length;
  
  // Call volume by day data
  const callVolumeByDay = [
    { name: "Mon", inbound: 12, outbound: 18 },
    { name: "Tue", inbound: 15, outbound: 12 },
    { name: "Wed", inbound: 8, outbound: 23 },
    { name: "Thu", inbound: 17, outbound: 15 },
    { name: "Fri", inbound: 14, outbound: 10 },
    { name: "Sat", inbound: 4, outbound: 2 },
    { name: "Sun", inbound: 2, outbound: 1 }
  ];
  
  // Call outcomes distribution
  const callOutcomes = [
    { name: "Completed", value: 68 },
    { name: "Voicemail", value: 15 },
    { name: "No Answer", value: 10 },
    { name: "Busy", value: 7 }
  ];
  
  // Call duration distribution
  const callDurations = [
    { name: "<1 min", count: 20 },
    { name: "1-3 min", count: 35 },
    { name: "3-5 min", count: 22 },
    { name: "5-10 min", count: 15 },
    { name: ">10 min", count: 8 }
  ];
  
  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  
  // Time series data for call trends
  const callTrends = [
    { date: "Week 1", inbound: 45, outbound: 32, average: 38.5 },
    { date: "Week 2", inbound: 52, outbound: 35, average: 43.5 },
    { date: "Week 3", inbound: 49, outbound: 41, average: 45 },
    { date: "Week 4", inbound: 63, outbound: 47, average: 55 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Call Analytics</h2>
          <p className="text-muted-foreground">
            Insights and metrics from your call activities
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select defaultValue={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="csv">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Export Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv" onSelect={() => handleExportData("csv")}>Export as CSV</SelectItem>
              <SelectItem value="pdf" onSelect={() => handleExportData("pdf")}>Export as PDF</SelectItem>
              <SelectItem value="excel" onSelect={() => handleExportData("excel")}>Export as Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CallVolumeMetric 
          totalCalls={totalCalls} 
          inboundCalls={inboundCalls} 
          outboundCalls={outboundCalls} 
          missedCalls={missedCalls}
          icon={<Phone className="h-5 w-5 text-blue-500" />}
        />
        
        <CallDurationMetric 
          avgDuration={avgDuration} 
          icon={<Clock className="h-5 w-5 text-green-500" />}
        />
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{scheduledFollowUps}</div>
              <CalendarClock className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {scheduledFollowUps > 0 ? `${Math.round(scheduledFollowUps / totalCalls * 100)}% of calls need follow-up` : "No follow-ups scheduled"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="distributions" className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4" />
            <span>Call Distributions</span>
          </TabsTrigger>
          <TabsTrigger value="callers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Top Callers</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Volume Trends</CardTitle>
              <CardDescription>Inbound vs. outbound calls over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={callTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="inbound" stroke="#0088FE" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="outbound" stroke="#00C49F" />
                    <Line type="monotone" dataKey="average" stroke="#FFBB28" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Daily Call Distribution</CardTitle>
              <CardDescription>Calls by day of week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={callVolumeByDay} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inbound" name="Inbound" fill="#0088FE" />
                    <Bar dataKey="outbound" name="Outbound" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distributions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CallTypeDistribution 
              inboundPercentage={Math.round((inboundCalls / totalCalls) * 100)} 
              outboundPercentage={Math.round((outboundCalls / totalCalls) * 100)}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Call Outcomes</CardTitle>
                <CardDescription>Distribution of call outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={callOutcomes}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {callOutcomes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Call Duration Distribution</CardTitle>
              <CardDescription>Length of calls grouped by time ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={callDurations} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Number of Calls" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="callers" className="space-y-4">
          <TopCallersList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallAnalyticsDashboard;
