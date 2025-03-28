
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GuideProvider } from "./contexts/GuideContext";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
import FloatingGuideButton from "./components/guides/FloatingGuideButton";
import GuideViewer from "./components/guides/GuideViewer";
import PatientsPage from "./pages/Patients";
import PatientDetailPage from "./pages/PatientDetail";
import RoadmapPage from "./pages/Roadmap";
import HealthcareCRMStrategies from "./pages/HealthcareCRM";
import KnowledgeBase from "./pages/KnowledgeBase";
import ChallengesSolutions from "./pages/ChallengesSolutions";
import GuideCatalog from "./pages/Guides";
import SettingsPage from "./pages/Settings";
import OrganizationsPage from "./pages/Organizations";
import OrganizationDetailView from "./components/organizations/details/OrganizationDetailView";
import DealsPage from "./pages/Deals";
import OfficeManagementPage from "./pages/Office";
import HealthTrackerDashboard from "./components/health-tracker/HealthTrackerDashboard";
import CallTrackingDashboard from "./pages/CallTracking";
import WorkflowAutomationPage from "./pages/Workflows";
import WorkflowAnalyticsDashboard from "./components/workflows/analytics/WorkflowAnalyticsDashboard";

function App() {
  return (
    <ThemeProvider>
      <GuideProvider>
        {/* Floating Guide Button and Guide Viewer are placed outside the routes */}
        <FloatingGuideButton />
        <GuideViewer />
        
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="patients/:id" element={<PatientDetailPage />} />
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="healthcare-crm" element={<HealthcareCRMStrategies />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="challenges" element={<ChallengesSolutions />} />
            <Route path="guides" element={<GuideCatalog />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="organizations" element={<OrganizationsPage />} />
            <Route path="organizations/:id" element={<OrganizationDetailView />} />
            <Route path="deals" element={<DealsPage />} />
            <Route path="office-management" element={<OfficeManagementPage />} />
            <Route path="health-tracker" element={<HealthTrackerDashboard />} />
            <Route path="call-tracking" element={<CallTrackingDashboard />} />
            <Route path="workflow-automation" element={<WorkflowAutomationPage />} />
            <Route path="workflow-analytics" element={<WorkflowAnalyticsDashboard />} />
          </Route>
        </Routes>
      </GuideProvider>
    </ThemeProvider>
  );
}

export default App;
