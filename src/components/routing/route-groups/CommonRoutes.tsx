
import React from "react";
import { Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Patients from "@/pages/Patients";
import PatientDetail from "@/pages/PatientDetail";
import Calendar from "@/pages/Calendar";
import Email from "@/pages/Email";
import KnowledgeBasePage from "@/pages/KnowledgeBase";
import ChallengesSolutionsPage from "@/pages/ChallengesSolutions";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import { useAuth } from "@/context/AuthContext";

// Helper component to handle auth state
const AuthWrapper = ({ isSignUp }: { isSignUp: boolean }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login isSignUp={isSignUp} />;
};

export const CommonRoutes = (
  <>
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
    
    <Route path="/patients" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "front-desk"]}>
        <Patients />
      </ProtectedRoute>
    } />
    
    <Route path="/patients/:patientId" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "front-desk"]}>
        <PatientDetail />
      </ProtectedRoute>
    } />
    
    <Route path="/calendar" element={
      <ProtectedRoute allowedRoles={["admin", "power-user", "doctor", "nurse", "front-desk"]}>
        <Calendar />
      </ProtectedRoute>
    } />
    
    <Route path="/email" element={
      <ProtectedRoute>
        <Email />
      </ProtectedRoute>
    } />
    
    <Route path="/knowledge-base" element={
      <ProtectedRoute>
        <KnowledgeBasePage />
      </ProtectedRoute>
    } />
    
    <Route path="/challenges-solutions" element={
      <ProtectedRoute>
        <ChallengesSolutionsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/settings" element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    } />
    
    <Route 
      path="/signup" 
      element={<AuthWrapper isSignUp={true} />} 
    />
  </>
);
