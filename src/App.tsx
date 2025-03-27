
import React, { useEffect } from "react";
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
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/NotFound";
import { registerServiceWorker, checkForServiceWorkerUpdate } from "./registerServiceWorker";
import { useToast } from "@/hooks/use-toast";

function App() {
  const { toast } = useToast();

  useEffect(() => {
    // Register service worker for offline support
    registerServiceWorker();
    
    // Check for updates to service worker
    checkForServiceWorkerUpdate(() => {
      toast({
        title: "Update available",
        description: "A new version of the app is available. Refresh to update.",
        duration: 10000,
      });
    });
  }, [toast]);
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
