
import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Contacts from "@/pages/Contacts";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Roadmap from "@/pages/Roadmap";
import MindMap from "@/pages/MindMap";
import HealthcareCRM from "@/pages/HealthcareCRM";
import OpenCRMRoadmap from "@/pages/OpenCRMRoadmap";
import Organizations from "@/pages/Organizations";
import Deals from "@/pages/Deals";
import Calendar from "@/pages/Calendar";
import Email from "@/pages/Email";
import Reports from "@/pages/Reports";

function App() {
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
        <Route path="/settings" element={<Settings />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/mind-map" element={<MindMap />} />
        <Route path="/healthcare-crm" element={<HealthcareCRM />} />
        <Route path="/open-crm-roadmap" element={<OpenCRMRoadmap />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/email" element={<Email />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
