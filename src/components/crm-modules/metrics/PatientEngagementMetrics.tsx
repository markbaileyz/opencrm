
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { 
  Calendar, 
  Filter, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  CalendarClock, 
  Info
} from "lucide-react";

// Sample data - in a real app, this would come from an API
const engagementData = {
  lastWeek: [
    { day: "Mon", appointments: 12, messages: 8, noShows: 2 },
    { day: "Tue", appointments: 15, messages: 11, noShows: 1 },
    { day: "Wed", appointments: 18, messages: 14, noShows: 3 },
    { day: "Thu", appointments: 14, messages: 9, noShows: 2 },
    { day: "Fri", appointments: 16, messages: 12, noShows: 1 },
    { day: "Sat", appointments: 8, messages: 4, noShows: 0 },
    { day: "Sun", appointments: 5, messages: 2, noShows: 1 },
  ],
  lastMonth: [
    { week: "Week 1", appointments: 78, messages: 52, noShows: 9 },
    { week: "Week 2", appointments: 85, messages: 61, noShows: 8 },
    { week: "Week 3", appointments: 89, messages: 58, noShows: 10 },
    { week: "Week 4", appointments: 94, messages: 67, noShows: 7 },
  ],
  lastQuarter: [
    { month: "Jan", appointments: 320, messages: 245, noShows: 38 },
    { month: "Feb", appointments: 350, messages: 265, noShows: 42 },
    { month: "Mar", appointments: 375, messages: 290, noShows: 35 },
  ]
};

const patientSegmentation = [
  { name: "New Patients", value: 28 },
  { name: "Regular Patients", value: 45 },
  { name: "Returning Patients", value: 18 },
  { name: "Referrals", value: 9 }
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center justify-center p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">{value}</h3>
              <div className={`flex items-center text-xs font-medium ${change >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                {change >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                )}
                {Math.abs(change)}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PatientEngagementMetrics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("week");

  const currentData = 
    timeRange === "week" ? engagementData.lastWeek : 
    timeRange === "month" ? engagementData.lastMonth : 
    engagementData.lastQuarter;

  const xAxisKey = 
    timeRange === "week" ? "day" : 
    timeRange === "month" ? "week" : 
    "month";

  const calculateMetrics = () => {
    let appointments = 0;
    let messages = 0;
    let noShows = 0;
    
    currentData.forEach(item => {
      appointments += item.appointments;
      messages += item.messages;
      noShows += item.noShows;
    });

    const appointmentRatio = Math.round((appointments - noShows) / appointments * 100);
    const messagesPerAppointment = (messages / appointments).toFixed(1);
    
    return {
      totalAppointments: appointments,
      totalMessages: messages,
      noShowRate: `${Math.round(noShows / appointments * 100)}%`,
      appointmentAttendance: `${appointmentRatio}%`,
      messagesPerAppointment
    };
  };

  const metrics = calculateMetrics();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Patient Engagement Metrics</CardTitle>
            <p className="text-muted-foreground text-sm">Track patient engagement activities</p>
          </div>
          
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as "week" | "month" | "quarter")}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Appointments"
              value={metrics.totalAppointments}
              change={5}
              icon={<Calendar className="h-5 w-5 text-primary" />}
            />
            <MetricCard
              title="Appointment Attendance"
              value={metrics.appointmentAttendance}
              change={2}
              icon={<CalendarClock className="h-5 w-5 text-primary" />}
            />
            <MetricCard
              title="No-Show Rate"
              value={metrics.noShowRate}
              change={-3}
              icon={<Users className="h-5 w-5 text-primary" />}
            />
            <MetricCard
              title="Messages per Patient"
              value={metrics.messagesPerAppointment}
              change={8}
              icon={<MessageSquare className="h-5 w-5 text-primary" />}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Engagement Activity</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xAxisKey} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="appointments" stackId="a" fill="#8884d8" name="Appointments" />
                  <Bar dataKey="messages" stackId="b" fill="#82ca9d" name="Messages" />
                  <Bar dataKey="noShows" stackId="c" fill="#ff8042" name="No-Shows" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Patient Segmentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {patientSegmentation.map((segment, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <p className="font-medium mb-1">{segment.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">{segment.value}%</span>
                        <Badge variant="outline">{segment.value < 20 ? "Low" : segment.value < 40 ? "Medium" : "High"}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default PatientEngagementMetrics;
