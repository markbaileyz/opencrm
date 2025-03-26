
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.email.includes("admin");
  const isDoctor = user?.email.includes("doctor");
  
  // Simulated data
  const patientActivityData = [
    { name: "Jan", value: 24 },
    { name: "Feb", value: 28 },
    { name: "Mar", value: 32 },
    { name: "Apr", value: 30 },
    { name: "May", value: 35 },
    { name: "Jun", value: 42 },
    { name: "Jul", value: 45 },
    { name: "Aug", value: 50 },
    { name: "Sep", value: 48 },
    { name: "Oct", value: 52 },
    { name: "Nov", value: 58 },
    { name: "Dec", value: 62 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Welcome to your admin dashboard" : "Welcome to your healthcare dashboard"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
          <StatCard
            title="Total Patients"
            value={isAdmin ? "1,284" : "763"}
            icon={<Users className="h-5 w-5 text-primary" />}
            description={`${isAdmin ? "42" : "12"} new this month`}
            trend="up"
          />
          <StatCard
            title="Appointments"
            value={isAdmin ? "342" : "56"}
            icon={<Calendar className="h-5 w-5 text-primary" />}
            description={`${isAdmin ? "18" : "8"} today`}
            trend="up"
          />
          <StatCard
            title="Unread Messages"
            value={isAdmin ? "28" : "12"}
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            description="Last message 12m ago"
            trend="neutral"
          />
          <StatCard
            title="Patient Satisfaction"
            value={isAdmin ? "92%" : "94%"}
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
            description="3% increase"
            trend="up"
          />
        </div>

        {/* Activity Chart */}
        <div className="space-y-6 animate-fade-up delay-200">
          <Card>
            <CardHeader>
              <CardTitle>Patient Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={patientActivityData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary) / 0.2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up delay-300">
          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AppointmentItem
                  name="Sarah Johnson"
                  time="9:00 AM"
                  type="Check-up"
                  status="completed"
                />
                <AppointmentItem
                  name="Robert Chen"
                  time="10:30 AM"
                  type="Follow-up"
                  status="completed"
                />
                <AppointmentItem
                  name="Emily Davis"
                  time="1:15 PM"
                  type="Consultation"
                  status="upcoming"
                />
                <AppointmentItem
                  name="Michael Williams"
                  time="3:00 PM"
                  type="New Patient"
                  status="upcoming"
                />
                <AppointmentItem
                  name="Jessica Brown"
                  time="4:30 PM"
                  type="Review"
                  status="upcoming"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MessageItem
                  name="Dr. Rebecca Lee"
                  message="Updated lab results for patient #12948"
                  time="10m ago"
                  unread
                />
                <MessageItem
                  name="Nurse Martinez"
                  message="Question about medication for Johnson, T."
                  time="32m ago"
                  unread
                />
                <MessageItem
                  name="Front Desk"
                  message="New appointment request from Davis family"
                  time="1h ago"
                />
                <MessageItem
                  name="Dr. James Wilson"
                  message="Follow-up notes from today's meeting"
                  time="3h ago"
                />
                <MessageItem
                  name="Sarah (Patient)"
                  message="Thank you for the great care yesterday!"
                  time="1d ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  trend: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, icon, description, trend }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="p-2 rounded-full bg-primary/10">{icon}</span>
          {trend === "up" && (
            <span className="text-green-500 text-xs font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Growing
            </span>
          )}
          {trend === "down" && (
            <span className="text-red-500 text-xs font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
              Declining
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Appointment Item Component
interface AppointmentItemProps {
  name: string;
  time: string;
  type: string;
  status: "completed" | "upcoming" | "canceled";
}

const AppointmentItem = ({ name, time, type, status }: AppointmentItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="flex items-center">
        <div className="mr-3">
          {status === "completed" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : status === "upcoming" ? (
            <Clock className="h-5 w-5 text-primary" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className="text-sm">{time}</div>
    </div>
  );
};

// Message Item Component
interface MessageItemProps {
  name: string;
  message: string;
  time: string;
  unread?: boolean;
}

const MessageItem = ({ name, message, time, unread }: MessageItemProps) => {
  return (
    <div className={`flex items-start p-3 rounded-lg ${unread ? "bg-primary/5" : "hover:bg-secondary/50"} transition-colors`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className={`font-medium text-sm ${unread ? "text-primary" : ""}`}>{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate">{message}</p>
      </div>
      {unread && (
        <div className="ml-2 h-2 w-2 rounded-full bg-primary"></div>
      )}
    </div>
  );
};

export default Dashboard;
