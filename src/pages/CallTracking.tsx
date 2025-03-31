
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CallTrackingList from "@/components/calls/CallTrackingList";

const CallTracking = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Call Tracking</h1>
        <CallTrackingList />
      </div>
    </DashboardLayout>
  );
};

export default CallTracking;
