
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import FrontDesk from "@/pages/FrontDesk";
import Office from "@/pages/Office";
import PlaceholderPage from "@/components/ui/placeholder-page";

const FrontDeskRoutes: React.FC = () => {
  return (
    <>
      {/* Front Desk Routes */}
      <Route path="/patient-feedback" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "front-desk"]}>
          <PlaceholderPage title="Patient Feedback" description="View and manage patient feedback and surveys. Coming soon." />
        </ProtectedRoute>
      } />
      
      <Route path="/office-management" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "front-desk"]}>
          <Office />
        </ProtectedRoute>
      } />
      
      <Route path="/front-desk" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "front-desk"]}>
          <FrontDesk />
        </ProtectedRoute>
      } />
    </>
  );
};

export default FrontDeskRoutes;
