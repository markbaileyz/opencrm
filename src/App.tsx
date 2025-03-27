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
import { ThemeProvider } from "@/components/theme-provider";
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/patients" element={
            <ProtectedRoute allowedRoles={["admin", "doctor", "nurse", "front-desk"]}>
              <Patients />
            </ProtectedRoute>
          } />
          
          <Route path="/front-desk" element={
            <ProtectedRoute allowedRoles={["admin", "front-desk"]}>
              <FrontDesk />
            </ProtectedRoute>
          } />
          
          <Route path="/calendar" element={
            <ProtectedRoute allowedRoles={["admin", "doctor", "nurse", "front-desk"]}>
              <Calendar />
            </ProtectedRoute>
          } />
          
          <Route path="/admin-settings" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSettings />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          } />
          
          <Route path="/contacts" element={
            <ProtectedRoute allowedRoles={["admin", "doctor", "nurse"]}>
              <Contacts />
            </ProtectedRoute>
          } />
          
          <Route path="/organizations" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Organizations />
            </ProtectedRoute>
          } />
          
          <Route path="/deals" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Deals />
            </ProtectedRoute>
          } />
          
          <Route path="/email" element={
            <ProtectedRoute>
              <Email />
            </ProtectedRoute>
          } />
          
          <Route path="/roadmap" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Roadmap />
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
            <ProtectedRoute allowedRoles={["admin"]}>
              <HealthcareCRM />
            </ProtectedRoute>
          } />
          
          <Route path="/open-crm-roadmap" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <OpenCRMRoadmap />
            </ProtectedRoute>
          } />
          
          <Route path="/mind-map" element={
            <ProtectedRoute allowedRoles={["admin"]}>
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
    </ThemeProvider>
  );
}

export default App;
