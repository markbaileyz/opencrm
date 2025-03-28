
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Calendar, Phone } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`mt-2 flex items-center text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Patients"
        value="3,842"
        description="Active patient records"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: "+12.5% from last month", positive: true }}
      />
      <MetricCard
        title="Upcoming Appointments"
        value="24"
        description="Next 7 days"
        icon={<Calendar className="h-4 w-4" />}
        trend={{ value: "+3 from yesterday", positive: true }}
      />
      <MetricCard
        title="Recent Calls"
        value="87"
        description="Last 30 days"
        icon={<Phone className="h-4 w-4" />}
        trend={{ value: "-5.2% from last month", positive: false }}
      />
      <MetricCard
        title="Active Workflows"
        value="16"
        description="Currently running"
        icon={<Activity className="h-4 w-4" />}
        trend={{ value: "+4 from last week", positive: true }}
      />
    </div>
  );
};

export default DashboardMetrics;
