
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CallRecord } from "@/types/call";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, TrendingUp, Clock, Calendar, BarChart3, PieChart } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface CallAnalyticsProps {
  calls: CallRecord[];
  dateRange: "week" | "month" | "quarter" | "year";
}

const CallAnalytics: React.FC<CallAnalyticsProps> = ({ calls, dateRange }) => {
  // Filter calls based on date range
  const filteredCalls = React.useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (dateRange) {
      case "week":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case "year":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return calls.filter(call => new Date(call.timestamp) >= cutoffDate);
  }, [calls, dateRange]);

  // Calculate call statistics
  const statistics = React.useMemo(() => {
    const totalCalls = filteredCalls.length;
    const incomingCalls = filteredCalls.filter(call => call.type === "incoming").length;
    const outgoingCalls = filteredCalls.filter(call => call.type === "outgoing").length;
    const missedCalls = filteredCalls.filter(call => call.type === "missed").length;
    const scheduledCalls = filteredCalls.filter(call => call.type === "scheduled").length;
    const totalDuration = filteredCalls.reduce((acc, call) => acc + (call.duration || 0), 0);
    const avgDuration = totalCalls > 0 ? Math.round(totalDuration / totalCalls) : 0;
    
    return {
      totalCalls,
      incomingCalls,
      outgoingCalls,
      missedCalls,
      scheduledCalls,
      totalDuration,
      avgDuration
    };
  }, [filteredCalls]);

  // Prepare data for Pie Chart - Call Types
  const callTypeData = [
    { name: "Incoming", value: statistics.incomingCalls, color: "#10b981" },
    { name: "Outgoing", value: statistics.outgoingCalls, color: "#3b82f6" },
    { name: "Missed", value: statistics.missedCalls, color: "#ef4444" },
    { name: "Scheduled", value: statistics.scheduledCalls, color: "#64748b" }
  ].filter(item => item.value > 0);

  // Prepare data for Bar Chart - Daily Calls
  const getDailyCallData = () => {
    const days = dateRange === "week" ? 7 : 30;
    const dailyData: Record<string, { date: string; incoming: number; outgoing: number; missed: number }> = {};
    
    // Initialize with empty data
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyData[dateStr] = { 
        date: dateStr, 
        incoming: 0, 
        outgoing: 0, 
        missed: 0 
      };
    }
    
    // Fill with actual data
    filteredCalls.forEach(call => {
      const dateStr = new Date(call.timestamp).toISOString().split('T')[0];
      if (dailyData[dateStr]) {
        if (call.type === "incoming") dailyData[dateStr].incoming++;
        else if (call.type === "outgoing") dailyData[dateStr].outgoing++;
        else if (call.type === "missed") dailyData[dateStr].missed++;
      }
    });
    
    return Object.values(dailyData).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const dailyCallData = getDailyCallData();

  // Format minutes and seconds for display
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
      return `${remainingSeconds} seconds`;
    }
    
    return `${minutes} min ${remainingSeconds} sec`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              {dateRange === "week" ? "Past 7 days" : 
               dateRange === "month" ? "Past 30 days" : 
               dateRange === "quarter" ? "Past 3 months" : "Past year"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Call Ratio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.totalCalls === 0 ? "N/A" : 
                `${Math.round((statistics.incomingCalls / statistics.totalCalls) * 100)}% In`}
            </div>
            <p className="text-xs text-muted-foreground">
              {statistics.outgoingCalls} outgoing / {statistics.incomingCalls} incoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.avgDuration === 0 ? "N/A" : formatDuration(statistics.avgDuration)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total: {formatDuration(statistics.totalDuration)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.missedCalls}
              <span className="text-sm ml-1 font-normal text-muted-foreground">
                ({statistics.totalCalls === 0 ? "0" : 
                  `${Math.round((statistics.missedCalls / statistics.totalCalls) * 100)}%`})
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {statistics.scheduledCalls} follow-ups scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="call-volume" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="call-volume" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Call Volume</span>
          </TabsTrigger>
          <TabsTrigger value="call-types" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Call Types</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="call-volume">
          <Card>
            <CardHeader>
              <CardTitle>Daily Call Volume</CardTitle>
              <CardDescription>
                Call volume trend over the {dateRange === "week" ? "past week" : "past month"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyCallData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString();
                      }}
                    />
                    <Legend />
                    <Bar dataKey="incoming" name="Incoming" fill="#10b981" />
                    <Bar dataKey="outgoing" name="Outgoing" fill="#3b82f6" />
                    <Bar dataKey="missed" name="Missed" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="call-types">
          <Card>
            <CardHeader>
              <CardTitle>Call Type Distribution</CardTitle>
              <CardDescription>
                Breakdown of call types during the selected period
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex justify-center">
                {callTypeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={callTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {callTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [value, "Calls"]} 
                      />
                      <Legend />
                    </RPieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No data available for the selected period</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallAnalytics;
