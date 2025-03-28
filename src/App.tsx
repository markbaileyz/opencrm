
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

// Import all the pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Patients from "@/pages/Patients";
import PatientDetail from "@/pages/PatientDetail";
import PatientVitalsPage from "@/pages/PatientVitalsPage";
import MedicalRecordsPage from "@/pages/MedicalRecordsPage";
import MedicationsPage from "@/pages/MedicationsPage";
import PrescriptionsPage from "@/pages/PrescriptionsPage";
import HealthTrackerPage from "@/pages/HealthTrackerPage";
import Calendar from "@/pages/Calendar";
import Email from "@/pages/Email";
import Contacts from "@/pages/Contacts";
import Deals from "@/pages/Deals";
import Organizations from "@/pages/Organizations";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import AdminSettings from "@/pages/AdminSettings";
import UserManagement from "@/pages/UserManagement";
import Roadmap from "@/pages/Roadmap";
import DashboardRoadmap from "@/pages/DashboardRoadmap";
import MindMap from "@/pages/MindMap";
import HealthcareCRM from "@/pages/HealthcareCRM";
import OpenCRMRoadmap from "@/pages/OpenCRMRoadmap";
import FrontDesk from "@/pages/FrontDesk";
import Office from "@/pages/Office";
import PreCheckIn from "@/pages/PreCheckIn";
import CheckInConfirmation from "@/pages/CheckInConfirmation";
import KnowledgeBase from "@/pages/KnowledgeBase";
import ChallengesSolutions from "@/pages/ChallengesSolutions";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

// Import our new pages
import CallTracking from "@/pages/CallTracking";
import Workflows from "@/pages/Workflows";

import "./App.css";
import { Compliance } from "./pages/Compliance";
import ServiceWorkerManager from "./components/service-worker/ServiceWorkerManager";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <ServiceWorkerManager />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pre-check-in" element={<PreCheckIn />} />
        <Route path="/check-in-confirmation" element={<CheckInConfirmation />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/mind-map" element={<MindMap />} />
        <Route path="/healthcare-crm" element={<HealthcareCRM />} />
        <Route path="/opencrm-roadmap" element={<OpenCRMRoadmap />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/challenges-solutions" element={<ChallengesSolutions />} />

        {/* Protected Routes - requires authentication */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/:patientId"
          element={
            <ProtectedRoute>
              <PatientDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-vitals"
          element={
            <ProtectedRoute>
              <PatientVitalsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical-records"
          element={
            <ProtectedRoute>
              <MedicalRecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medications"
          element={
            <ProtectedRoute>
              <MedicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prescriptions"
          element={
            <ProtectedRoute>
              <PrescriptionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/health-tracker"
          element={
            <ProtectedRoute>
              <HealthTrackerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/email"
          element={
            <ProtectedRoute>
              <Email />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deals"
          element={
            <ProtectedRoute>
              <Deals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizations"
          element={
            <ProtectedRoute>
              <Organizations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-settings"
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-roadmap"
          element={
            <ProtectedRoute>
              <DashboardRoadmap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/front-desk"
          element={
            <ProtectedRoute>
              <FrontDesk />
            </ProtectedRoute>
          }
        />
        <Route
          path="/office"
          element={
            <ProtectedRoute>
              <Office />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compliance"
          element={
            <ProtectedRoute>
              <Compliance />
            </ProtectedRoute>
          }
        />
        {/* Add our new routes */}
        <Route
          path="/call-tracking"
          element={
            <ProtectedRoute>
              <CallTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workflows"
          element={
            <ProtectedRoute>
              <Workflows />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
