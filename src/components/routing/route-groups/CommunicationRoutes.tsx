
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PlaceholderPage from "@/components/ui/placeholder-page";

export const CommunicationRoutes = (
  <>
    <Route path="/secure-chat" element={
      <ProtectedRoute>
        <PlaceholderPage title="Secure Chat" description="Securely communicate with patients and staff. This feature is coming soon." />
      </ProtectedRoute>
    } />
  </>
);
