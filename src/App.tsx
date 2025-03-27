
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Contacts from "@/pages/Contacts";
import Patients from "@/pages/Patients";
import Calendar from "@/pages/Calendar";
import Email from "@/pages/Email";
import HealthcareCRM from "@/pages/HealthcareCRM";
import PatientPortal from "@/pages/PatientPortal";
import PreCheckIn from "@/pages/PreCheckIn";
import Roadmap from "@/pages/Roadmap";
import Office from "@/pages/Office";
import FrontDesk from "@/pages/FrontDesk";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

// Import providers
import { AuthProvider } from "@/context/AuthContext";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/email" element={<Email />} />
            <Route path="/office" element={<Office />} />
            <Route path="/front-desk" element={<FrontDesk />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/healthcare-crm" element={<HealthcareCRM />} />
            <Route path="/patient-portal" element={<PatientPortal />} />
            <Route path="/pre-check-in" element={<PreCheckIn />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
