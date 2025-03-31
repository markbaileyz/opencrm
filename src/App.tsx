
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Contacts from "@/pages/Contacts";
import Email from "@/pages/Email";
import NotFound from "@/pages/NotFound";
import ModularCRM from "@/pages/ModularCRM";
import CRMConfig from "@/pages/CRMConfig";
import CRMModule from "@/pages/CRMModule";
import Roadmap from "@/pages/Roadmap";
import OpenCRMRoadmapPage from "@/pages/OpenCRMRoadmap";
import DashboardRoadmap from "@/pages/DashboardRoadmap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/email" element={<Email />} />
      
      {/* CRM routes */}
      <Route path="/crm" element={<ModularCRM />} />
      <Route path="/crm-config" element={<CRMConfig />} />
      <Route path="/crm/:moduleId" element={<CRMModule />} />
      
      {/* Roadmap routes */}
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/open-crm-roadmap" element={<OpenCRMRoadmapPage />} />
      <Route path="/dashboard-roadmap" element={<DashboardRoadmap />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
