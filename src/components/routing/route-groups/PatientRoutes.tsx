
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import MedicalRecordsPage from "@/pages/MedicalRecordsPage";
import HealthTrackerPage from "@/pages/HealthTrackerPage";
import PlaceholderPage from "@/components/ui/placeholder-page";

export const PatientRoutes = (
  <>
    <Route path="/medical-records" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <MedicalRecordsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/medications" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PlaceholderPage title="Medications" description="Your medications will be displayed here soon. We're currently developing this feature." />
      </ProtectedRoute>
    } />
    
    <Route path="/health-tracker" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "patient"]}>
        <HealthTrackerPage />
      </ProtectedRoute>
    } />
  </>
);
