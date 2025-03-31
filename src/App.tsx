
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
import Calendar from "@/pages/Calendar";
import Office from "@/pages/Office";
import Organizations from "@/pages/Organizations";
import Patients from "@/pages/Patients";
import Reports from "@/pages/Reports";
import HealthTracker from "@/pages/HealthTracker";
import MedicalRecords from "@/pages/MedicalRecords";
import Medications from "@/pages/Medications";
import Prescriptions from "@/pages/Prescriptions";
import PatientVitals from "@/pages/PatientVitals";
import Compliance from "@/pages/Compliance";
import FrontDesk from "@/pages/FrontDesk";
import Deals from "@/pages/Deals";
import CallTracking from "@/pages/CallTracking";
import Workflows from "@/pages/Workflows";
import Settings from "@/pages/Settings";
import UserManagement from "@/pages/UserManagement";
import AdminSettings from "@/pages/AdminSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/email" element={<Email />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/office" element={<Office />} />
      <Route path="/organizations" element={<Organizations />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/reports" element={<Reports />} />
      
      {/* Healthcare specific routes */}
      <Route path="/health-tracker" element={<HealthTracker />} />
      <Route path="/medical-records" element={<MedicalRecords />} />
      <Route path="/medications" element={<Medications />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="/patient-vitals" element={<PatientVitals />} />
      <Route path="/compliance" element={<Compliance />} />
      <Route path="/front-desk" element={<FrontDesk />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/call-tracking" element={<CallTracking />} />
      <Route path="/workflows" element={<Workflows />} />
      
      {/* Settings routes */}
      <Route path="/settings" element={<Settings />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/admin-settings" element={<AdminSettings />} />
      
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
