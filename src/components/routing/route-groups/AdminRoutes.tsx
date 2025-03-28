
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Organizations from "@/pages/Organizations";
import Deals from "@/pages/Deals";
import Reports from "@/pages/Reports";
import DashboardRoadmap from "@/pages/DashboardRoadmap";
import MindMap from "@/pages/MindMap";
import HealthcareCRM from "@/pages/HealthcareCRM";
import OpenCRMRoadmap from "@/pages/OpenCRMRoadmap";
import AdminSettings from "@/pages/AdminSettings";
import Compliance from "@/pages/Compliance";
import UserManagement from "@/pages/UserManagement";

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Route path="/organizations" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <Organizations />
        </ProtectedRoute>
      } />
      
      <Route path="/deals" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <Deals />
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <Reports />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard-roadmap" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <DashboardRoadmap />
        </ProtectedRoute>
      } />
      
      <Route path="/healthcare-crm" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <HealthcareCRM />
        </ProtectedRoute>
      } />
      
      <Route path="/open-crm-roadmap" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <OpenCRMRoadmap />
        </ProtectedRoute>
      } />
      
      <Route path="/mind-map" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <MindMap />
        </ProtectedRoute>
      } />
      
      <Route path="/admin-settings" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminSettings />
        </ProtectedRoute>
      } />
      
      <Route path="/compliance" element={
        <ProtectedRoute allowedRoles={["admin", "power-user"]}>
          <Compliance />
        </ProtectedRoute>
      } />
      
      <Route path="/user-management" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <UserManagement />
        </ProtectedRoute>
      } />
    </>
  );
};

export default AdminRoutes;
