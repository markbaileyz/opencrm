
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GuideProvider } from "./contexts/GuideContext";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import FloatingGuideButton from "./components/guides/FloatingGuideButton";
import GuideViewer from "./components/guides/GuideViewer";
import PatientsPage from "./pages/Patients";
import PatientDetailPage from "./pages/PatientDetail";
import DashboardRoadmap from "./pages/DashboardRoadmap";
import KnowledgeBasePage from "./pages/KnowledgeBase";
import ChallengesSolutionsPage from "./pages/ChallengesSolutions";
import Guides from "./pages/Guides";
import HealthcareCRM from "./pages/HealthcareCRM";

function App() {
  return (
    <ThemeProvider>
      <GuideProvider>
        {/* Floating Guide Button and Guide Viewer are placed outside the routes */}
        <FloatingGuideButton />
        <GuideViewer />
        
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="patients/:id" element={<PatientDetailPage />} />
            <Route path="roadmap" element={<DashboardRoadmap />} />
            <Route path="healthcare-crm" element={<HealthcareCRM />} />
            <Route path="knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="challenges" element={<ChallengesSolutionsPage />} />
            <Route path="guides" element={<Guides />} />
          </Route>
        </Routes>
      </GuideProvider>
    </ThemeProvider>
  );
}

export default App;
