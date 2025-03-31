
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PrescriptionHeader from "@/components/prescriptions/PrescriptionHeader";

const Prescriptions = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <PrescriptionHeader />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="bg-muted/30 p-6 rounded-md text-center h-64 flex items-center justify-center">
              <div>
                <p className="text-lg mb-4">Prescription management interface coming soon</p>
                <p className="text-sm text-muted-foreground">
                  This section will include active prescriptions, history, and templates
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-card shadow-sm rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2">Active Prescriptions</h3>
              <p className="text-sm text-muted-foreground">No active prescriptions</p>
            </div>
            
            <div className="bg-card shadow-sm rounded-md p-4">
              <h3 className="font-medium mb-2">Recent History</h3>
              <p className="text-sm text-muted-foreground">No recent prescription history</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
