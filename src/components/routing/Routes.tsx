
import React from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Contacts from "@/pages/Contacts";
import Organizations from "@/pages/Organizations";
import Deals from "@/pages/Deals";
import Calendar from "@/pages/Calendar";
import Email from "@/pages/Email";
import Reports from "@/pages/Reports";
import Roadmap from "@/pages/Roadmap";
import MindMap from "@/pages/MindMap";
import HealthcareCRM from "@/pages/HealthcareCRM";
import OpenCRMRoadmap from "@/pages/OpenCRMRoadmap";
import KnowledgeBasePage from "@/pages/KnowledgeBase";
import ChallengesSolutionsPage from "@/pages/ChallengesSolutions";
import Settings from "@/pages/Settings";
import Patients from "@/pages/Patients";
import FrontDesk from "@/pages/FrontDesk";
import PreCheckIn from "@/pages/PreCheckIn";
import CheckInConfirmation from "@/pages/CheckInConfirmation";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import PlaceholderPage from "@/components/ui/placeholder-page";
import AdminSettings from "@/pages/AdminSettings";
import Compliance from "@/pages/Compliance";
import UserManagement from "@/pages/UserManagement";
import DashboardRoadmap from "@/pages/DashboardRoadmap";
import Office from "@/pages/Office";
import MedicalRecordsPage from "@/pages/MedicalRecordsPage";
import HealthTrackerPage from "@/pages/HealthTrackerPage";
import PatientVitalsPage from "@/pages/PatientVitalsPage";
import PrescriptionsPage from "@/pages/PrescriptionsPage";

const Routes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Public patient-facing routes */}
      <Route path="/pre-check-in" element={<PreCheckIn />} />
      <Route path="/check-in-confirmation" element={<CheckInConfirmation />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Patient Routes */}
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
      
      {/* Doctor Routes */}
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
      
      {/* Nurse Routes */}
      <Route path="/patient-vitals" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse"]}>
          <PatientVitalsPage />
        </ProtectedRoute>
      } />
      
      {/* Communication Routes */}
      <Route path="/secure-chat" element={
        <ProtectedRoute>
          <PlaceholderPage title="Secure Chat" description="Securely communicate with patients and staff. This feature is coming soon." />
        </ProtectedRoute>
      } />
      
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
      
      {/* Original Routes */}
      <Route path="/patients" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "front-desk"]}>
          <Patients />
        </ProtectedRoute>
      } />
      
      <Route path="/front-desk" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "front-desk"]}>
          <FrontDesk />
        </ProtectedRoute>
      } />
      
      <Route path="/calendar" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "front-desk"]}>
          <Calendar />
        </ProtectedRoute>
      } />
      
      <Route path="/admin-settings" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminSettings />
        </ProtectedRoute>
      } />
      
      <Route path="/compliance" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <Compliance />
        </ProtectedRoute>
      } />
      
      <Route path="/user-management" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <UserManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <Reports />
        </ProtectedRoute>
      } />
      
      <Route path="/contacts" element={
        <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse"]}>
          <Contacts />
        </ProtectedRoute>
      } />
      
      <Route path="/organizations" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <Organizations />
        </ProtectedRoute>
      } />
      
      <Route path="/deals" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <Deals />
        </ProtectedRoute>
      } />
      
      <Route path="/email" element={
        <ProtectedRoute>
          <Email />
        </ProtectedRoute>
      } />
      
      <Route path="/roadmap" element={<Roadmap />} />
      
      <Route path="/dashboard-roadmap" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <DashboardRoadmap />
        </ProtectedRoute>
      } />
      
      <Route path="/knowledge-base" element={
        <ProtectedRoute>
          <KnowledgeBasePage />
        </ProtectedRoute>
      } />
      
      <Route path="/challenges-solutions" element={
        <ProtectedRoute>
          <ChallengesSolutionsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/healthcare-crm" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <HealthcareCRM />
        </ProtectedRoute>
      } />
      
      <Route path="/open-crm-roadmap" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <OpenCRMRoadmap />
        </ProtectedRoute>
      } />
      
      <Route path="/mind-map" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <MindMap />
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login isSignUp={true} />} 
      />
      
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
