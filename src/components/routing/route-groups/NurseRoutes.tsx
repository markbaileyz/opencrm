
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PatientVitalsPage from "@/pages/PatientVitalsPage";

export const NurseRoutes = (
  <>
    <Route path="/patient-vitals" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse"]}>
        <PatientVitalsPage />
      </ProtectedRoute>
    } />
  </>
);
