
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import MedicalRecordsPage from "@/pages/MedicalRecordsPage";
import HealthTrackerPage from "@/pages/HealthTrackerPage";
import MedicationsPage from "@/pages/MedicationsPage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import PatientDashboardPage from "@/pages/PatientDashboardPage";
import PatientMessagesPage from "@/pages/PatientMessagesPage";
import PatientProfilePage from "@/pages/PatientProfilePage";
import PatientBillingPage from "@/pages/PatientBillingPage";
import PatientEducationPage from "@/pages/PatientEducationPage";

export const PatientRoutes = (
  <>
    <Route path="/patient/dashboard" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PatientDashboardPage />
      </ProtectedRoute>
    } />

    <Route path="/patient/medical-records" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <MedicalRecordsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/patient/medications" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <MedicationsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/patient/health-tracker" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "patient"]}>
        <HealthTrackerPage />
      </ProtectedRoute>
    } />

    <Route path="/patient/appointments" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <AppointmentsPage />
      </ProtectedRoute>
    } />

    <Route path="/patient/messages" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PatientMessagesPage />
      </ProtectedRoute>
    } />

    <Route path="/patient/profile" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PatientProfilePage />
      </ProtectedRoute>
    } />

    <Route path="/patient/billing" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PatientBillingPage />
      </ProtectedRoute>
    } />

    <Route path="/patient/education" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PatientEducationPage />
      </ProtectedRoute>
    } />

    {/* Maintain backward compatibility with old routes */}
    <Route path="/medical-records" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <MedicalRecordsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/medications" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <MedicationsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/health-tracker" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "patient"]}>
        <HealthTrackerPage />
      </ProtectedRoute>
    } />
  </>
);
