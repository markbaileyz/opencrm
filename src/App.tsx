
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const { toast } = useToast();
  const { 
    isOnline, 
    pendingActions, 
    isSyncing, 
    processPendingActions 
  } = useOfflineState();
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Register service worker for offline support
    registerServiceWorker();
    
    // Check for updates to service worker
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
    // Force a connection check
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
        {/* Offline banner at the top of the app */}
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/email" element={<Email />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/challenges-solutions" element={<ChallengesSolutionsPage />} />
          <Route path="/healthcare-crm" element={<HealthcareCRM />} />
          <Route path="/open-crm-roadmap" element={<OpenCRMRoadmap />} />
          <Route path="/mind-map" element={<MindMap />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
