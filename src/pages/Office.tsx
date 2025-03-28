
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import RoomManagement from "@/components/office/RoomManagement";
import SuppliesManagement from "@/components/office/supplies/SuppliesManagement";
import ScheduledTasksManagement from "@/components/office/ScheduledTasksManagement";
import CommunicationsManagement from "@/components/office/CommunicationsManagement";
import SupplyManagementContainer from "@/components/office/supplies/SupplyManagementContainer";
import StaffManagementContainer from "@/components/office/staff/StaffManagementContainer";
import SchedulingContainer from "@/components/office/scheduling/SchedulingContainer";
import { useOfficeResources } from "@/hooks/useOfficeResources";

// Import the new components
import OfficePageHeader from "@/components/office/OfficePageHeader";
import OfficeTabs from "@/components/office/OfficeTabs";
import OfficeDashboard from "@/components/office/overview/OfficeDashboard";

const Office = () => {
  const { lowStockSupplies, overdueTasks } = useOfficeResources();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <OfficePageHeader />

        <Tabs defaultValue="overview" className="space-y-4">
          <OfficeTabs 
            defaultValue="overview" 
            overdueTasks={overdueTasks} 
            lowStockSupplies={lowStockSupplies}
          />
          
          <TabsContent value="overview" className="space-y-4">
            <OfficeDashboard 
              overdueTasks={overdueTasks}
              lowStockSupplies={lowStockSupplies}
            />
          </TabsContent>
          
          <TabsContent value="scheduling" className="space-y-4">
            <SchedulingContainer />
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-4">
            <ScheduledTasksManagement />
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <RoomManagement />
            <SuppliesManagement />
            <SupplyManagementContainer />
          </TabsContent>
          
          <TabsContent value="staff" className="space-y-4">
            <StaffManagementContainer />
          </TabsContent>
          
          <TabsContent value="communications" className="space-y-4">
            <CommunicationsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Office;
