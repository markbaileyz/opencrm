
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import Home from "./pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Contacts from "@/pages/Contacts";
import Patients from "@/pages/Patients";
import Calendar from "@/pages/Calendar";
import Email from "@/pages/Email";
import HealthcareCRM from "@/pages/HealthcareCRM";
import PatientPortal from "./pages/PreCheckIn";
import Roadmap from "@/pages/Roadmap";
import Office from "@/pages/Office";
import FrontDesk from "@/pages/FrontDesk";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Organizations from "@/pages/Organizations";
import KnowledgeBase from "@/pages/KnowledgeBase";
import ChallengesSolutions from "@/pages/ChallengesSolutions";
import DashboardRoadmap from "@/pages/DashboardRoadmap";
import MindMap from "@/pages/MindMap";
import UserManagement from "@/pages/UserManagement";
import AdminSettings from "@/pages/AdminSettings";
import Compliance from "@/pages/Compliance";
import Deals from "@/pages/Deals";

// Import providers
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/healthcare-crm" element={<HealthcareCRM />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/pre-check-in" element={<PatientPortal />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/mind-map" element={<MindMap />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/email" element={<Email />} />
          <Route path="/office" element={<Office />} />
          <Route path="/front-desk" element={<FrontDesk />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Routes from sidebar that were missing */}
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/challenges-solutions" element={<ChallengesSolutions />} />
          <Route path="/dashboard-roadmap" element={<DashboardRoadmap />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/compliance" element={<Compliance />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
};

export default App;
