
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsGrid from "@/components/dashboard/StatsGrid";
import ActivityChart from "@/components/dashboard/ActivityChart";
import KeyMetrics from "@/components/dashboard/KeyMetrics";
import SalesPipeline from "@/components/dashboard/SalesPipeline";
import RecentContacts from "@/components/dashboard/RecentContacts";
import MobileDashboard from "@/components/dashboard/MobileDashboard";
import AppointmentList from "@/components/dashboard/AppointmentList";
import MessageList from "@/components/dashboard/MessageList";
import OrganizationInsights from "@/components/dashboard/OrganizationInsights";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OfflineBanner from "@/components/ui/offline-banner";
import { useOfflineState } from "@/hooks/use-offline-state";
import { useMediaQuery } from "@/hooks/use-media-query";

const Dashboard = () => {
  const { isOnline, pendingActions, isSyncing, processPendingActions } = useOfflineState();
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Mock sample data for activity chart
  const activityData = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 60 },
    { name: "May", value: 65 },
    { name: "Jun", value: 58 },
    { name: "Jul", value: 80 }
  ];
  // Assuming user is admin for now - this should be from authentication context
  const isAdmin = true;
  
  if (isMobile) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-4 space-y-6">
          <DashboardHeader isAdmin={isAdmin} />
          
          {/* Show offline banner if needed */}
          {(!isOnline || pendingActions > 0) && (
            <OfflineBanner 
              isOnline={isOnline} 
              pendingActions={pendingActions}
              isSyncing={isSyncing}
              onTryReconnect={processPendingActions}
            />
          )}
          
          <MobileDashboard />
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <DashboardHeader isAdmin={isAdmin} />
        
        {/* Show offline banner if needed - only shown here if not already in App.tsx */}
        {(!isOnline || pendingActions > 0) && (
          <OfflineBanner 
            isOnline={isOnline} 
            pendingActions={pendingActions}
            isSyncing={isSyncing}
            className="mb-6"
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <StatsGrid isAdmin={isAdmin} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityChart data={activityData} />
              <KeyMetrics />
            </div>
            <SalesPipeline />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <NotificationCenter />
            <AppointmentList />
            <MessageList />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentContacts />
          <OrganizationInsights />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
