
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import MedicalRecordsPage from "@/pages/MedicalRecordsPage";
import HealthTrackerPage from "@/pages/HealthTrackerPage";
import MedicationsPage from "@/pages/MedicationsPage";

// Using DashboardLayout for placeholder pages
import DashboardLayout from "@/components/DashboardLayout";

// Placeholder component for pages not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            This page is under development and will be available soon.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const PatientRoutes = (
  <>
    {/* Use PlaceholderPage for patient dashboard until it's implemented */}
    <Route path="/patient/dashboard" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <DashboardLayout>
          <PlaceholderPage title="Patient Dashboard" />
        </DashboardLayout>
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

    {/* Use PlaceholderPage for remaining patient routes until they're implemented */}
    <Route path="/patient/appointments" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PlaceholderPage title="Patient Appointments" />
      </ProtectedRoute>
    } />

    <Route path="/patient/messages" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PlaceholderPage title="Patient Messages" />
      </ProtectedRoute>
    } />

    <Route path="/patient/profile" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PlaceholderPage title="Patient Profile" />
      </ProtectedRoute>
    } />

    <Route path="/patient/billing" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PlaceholderPage title="Patient Billing" />
      </ProtectedRoute>
    } />

    <Route path="/patient/education" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
        <PlaceholderPage title="Patient Education" />
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
