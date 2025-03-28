
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
import { Card, CardContent } from "./components/ui/card";

// Create placeholder components for routes that don't have pages yet
const NotFoundPage = () => (
  <div className="container mx-auto py-6 text-center">
    <h1 className="text-4xl font-bold mb-6">Page Not Found</h1>
    <p className="text-muted-foreground mb-6">
      The page you're looking for doesn't exist or has been moved.
    </p>
  </div>
);

const PatientFeedbackPage = () => (
  <div className="container mx-auto py-6">
    <h1 className="text-3xl font-bold mb-6">Patient Feedback</h1>
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground">
          View and manage patient feedback and surveys. This feature is coming soon.
        </p>
      </CardContent>
    </Card>
  </div>
);

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
            <Route path="patient-feedback" element={<PatientFeedbackPage />} />
            
            {/* Add a catch-all route for 404 errors */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </GuideProvider>
    </ThemeProvider>
  );
}

export default App;
