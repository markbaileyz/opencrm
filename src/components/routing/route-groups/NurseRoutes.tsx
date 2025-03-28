
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PatientVitalsPage from "@/pages/PatientVitalsPage";

const NurseRoutes: React.FC = () => {
  return (
    <>
      <Route path="/patient-vitals" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse"]}>
          <PatientVitalsPage />
        </ProtectedRoute>
      } />
    </>
  );
};

export default NurseRoutes;
