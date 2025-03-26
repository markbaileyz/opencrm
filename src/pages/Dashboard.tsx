
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KeyMetrics from "@/components/dashboard/KeyMetrics";
import ActivityChart from "@/components/dashboard/ActivityChart";
import AppointmentList from "@/components/dashboard/AppointmentList";
import MessageList from "@/components/dashboard/MessageList";
import SalesPipeline from "@/components/dashboard/SalesPipeline";
import RecentContacts from "@/components/dashboard/RecentContacts";
import RealtimeMetricsChart from "@/components/dashboard/RealtimeMetricsChart";
import { OrganizationsProvider } from "@/context/OrganizationsContext";

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.email.includes("admin");
  const isDoctor = user?.email.includes("doctor");
  
  // Simulated data
  const customerActivityData = [
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
    <OrganizationsProvider>
      <DashboardLayout>
        <div className="space-y-6">
          <DashboardHeader isAdmin={isAdmin} />
          
          {/* Key Metrics */}
          <KeyMetrics />

          {/* Real-time Metrics */}
          <RealtimeMetricsChart />

          {/* Sales Pipeline */}
          <div className="grid grid-cols-1 gap-6 animate-fade-up delay-100">
            <SalesPipeline />
          </div>

          {/* Activity Chart */}
          <div className="space-y-6 animate-fade-up delay-200">
            <ActivityChart data={customerActivityData} />
          </div>

          {/* Recent items grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up delay-300">
            <RecentContacts />
            <div className="space-y-6">
              <AppointmentList />
              <MessageList />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </OrganizationsProvider>
  );
};

export default Dashboard;
