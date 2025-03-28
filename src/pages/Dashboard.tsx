
import React, { useEffect } from "react";
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
import WorkflowExecutionMonitor from "@/components/workflows/execution/WorkflowExecutionMonitor";
import { useOfflineState } from "@/hooks/use-offline-state";
import { useMediaQuery } from "@/hooks/use-media-query";
import { OrganizationsProvider } from "@/context/OrganizationsContext";
import { useWorkflows } from "@/components/workflows/hooks/useWorkflows";
import { useToast } from "@/hooks/use-toast";
import { useExecutionHistory } from "@/components/workflows/hooks/useExecutionHistory";

const Dashboard = () => {
  const { isOnline, pendingActions, isSyncing, processPendingActions } = useOfflineState();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  const { addExecutionRecord } = useExecutionHistory();
  
  // Get workflows data for the execution monitor
  const { 
    workflows, 
    handleActivateWorkflow, 
    handlePauseWorkflow, 
    handleViewWorkflow 
  } = useWorkflows();
  
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
  
  // Show welcome notification on dashboard load
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to Workflow Monitor",
        description: "You'll receive real-time notifications for workflow events here.",
        variant: "info"
      });
      
      // Add a sample execution record to demonstrate the functionality
      if (workflows.length > 0) {
        const workflow = workflows[0];
        addExecutionRecord({
          workflowId: workflow.id,
          workflowName: workflow.name,
          success: true,
          message: "Workflow monitoring activated"
        });
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast, workflows, addExecutionRecord]);
  
  // Function to handle view workflow details with toast notification
  const handleViewDetails = (id: string) => {
    toast({
      title: "Viewing workflow details",
      description: "Redirecting to workflow details page"
    });
    handleViewWorkflow(id);
  };
  
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
          
          {/* Add mobile workflow execution monitor */}
          <WorkflowExecutionMonitor
            workflows={workflows}
            onActivate={handleActivateWorkflow}
            onPause={handlePauseWorkflow}
            onViewDetails={handleViewDetails}
          />
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
            
            {/* Add workflow execution monitor */}
            <WorkflowExecutionMonitor
              workflows={workflows}
              onActivate={handleActivateWorkflow}
              onPause={handlePauseWorkflow}
              onViewDetails={handleViewDetails}
            />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <NotificationCenter />
            <AppointmentList />
            <MessageList />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentContacts />
          <OrganizationsProvider>
            <OrganizationInsights />
          </OrganizationsProvider>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
