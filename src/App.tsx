
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/NotFound";
import { 
  registerServiceWorker, 
  checkForServiceWorkerUpdate, 
  updateServiceWorker 
} from "./registerServiceWorker";
import { useToast } from "@/hooks/use-toast";
import { useOfflineState } from "@/hooks/use-offline-state";
import OfflineBanner from "@/components/ui/offline-banner";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

import AdminSettings from "@/pages/AdminSettings";
import Compliance from "@/pages/Compliance";
import UserManagement from "@/pages/UserManagement";
import DashboardRoadmap from "@/pages/DashboardRoadmap";

// Placeholder components for new pages
const MedicalRecords = () => <div>Medical Records Page Coming Soon</div>;
const Medications = () => <div>Medications Page Coming Soon</div>;
const HealthTracker = () => <div>Health Tracker Page Coming Soon</div>;
const ClinicalDashboard = () => <div>Clinical Dashboard Page Coming Soon</div>;
const Prescriptions = () => <div>Prescriptions Page Coming Soon</div>;
const PatientVitals = () => <div>Patient Vitals Page Coming Soon</div>;
const SecureChat = () => <div>Secure Chat Page Coming Soon</div>;
const PatientFeedback = () => <div>Patient Feedback Page Coming Soon</div>;
const OfficeManagement = () => <div>Office Management Page Coming Soon</div>;

function App() {
  const { toast } = useToast();
  const { 
    isOnline, 
    pendingActions, 
    isSyncing, 
    processPendingActions 
  } = useOfflineState();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    registerServiceWorker();
    checkForServiceWorkerUpdate(() => {
      setUpdateAvailable(true);
      toast({
        title: "Update available",
        description: "A new version of the app is available. Refresh to update.",
        duration: 10000,
        action: (
          <button 
            className="bg-primary text-white px-3 py-1 rounded text-xs font-medium"
            onClick={() => {
              updateServiceWorker();
              window.location.reload();
            }}
          >
            Update now
          </button>
        )
      });
    });
  }, [toast]);

  const handleTryReconnect = () => {
    if (navigator.onLine) {
      processPendingActions();
      toast({
        title: "Reconnected",
        description: "You are now online. Syncing your changes...",
      });
    } else {
      toast({
        title: "Still offline",
        description: "You are still offline. Please check your internet connection.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="relative">
      <div className="sticky top-0 z-50">
        <OfflineBanner 
          isOnline={isOnline} 
          pendingActions={pendingActions}
          isSyncing={isSyncing}
          onTryReconnect={handleTryReconnect}
          className="rounded-none border-x-0 border-t-0"
        />
      </div>
      
      <Routes>
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
            <MedicalRecords />
          </ProtectedRoute>
        } />
        
        <Route path="/medications" element={
          <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "patient"]}>
            <Medications />
          </ProtectedRoute>
        } />
        
        <Route path="/health-tracker" element={
          <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "patient"]}>
            <HealthTracker />
          </ProtectedRoute>
        } />
        
        {/* Doctor Routes */}
        <Route path="/clinical-dashboard" element={
          <ProtectedRoute allowedRoles={["admin", "power-user", "doctor"]}>
            <ClinicalDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/prescriptions" element={
          <ProtectedRoute allowedRoles={["admin", "power-user", "doctor"]}>
            <Prescriptions />
          </ProtectedRoute>
        } />
        
        {/* Nurse Routes */}
        <Route path="/patient-vitals" element={
          <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse"]}>
            <PatientVitals />
          </ProtectedRoute>
        } />
        
        {/* Communication Routes */}
        <Route path="/secure-chat" element={
          <ProtectedRoute>
            <SecureChat />
          </ProtectedRoute>
        } />
        
        {/* Front Desk Routes */}
        <Route path="/patient-feedback" element={
          <ProtectedRoute allowedRoles={["admin", "power-user", "front-desk"]}>
            <PatientFeedback />
          </ProtectedRoute>
        } />
        
        <Route path="/office-management" element={
          <ProtectedRoute allowedRoles={["admin", "power-user", "front-desk"]}>
            <OfficeManagement />
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
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
