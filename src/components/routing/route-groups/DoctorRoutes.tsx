
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PrescriptionsPage from "@/pages/PrescriptionsPage";
import PlaceholderPage from "@/components/ui/placeholder-page";
import PharmacyPage from "@/components/prescriptions/pharmacy/PharmacyPage";

export const DoctorRoutes = (
  <>
    <Route path="/clinical-dashboard" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor"]}>
        <PlaceholderPage title="Clinical Dashboard" description="Access your clinical metrics and patient data. Coming soon." />
      </ProtectedRoute>
    } />
    
    <Route path="/prescriptions" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor"]}>
        <PrescriptionsPage />
      </ProtectedRoute>
    } />

    <Route path="/pharmacy-integration" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor"]}>
        <PharmacyPage />
      </ProtectedRoute>
    } />
  </>
);
