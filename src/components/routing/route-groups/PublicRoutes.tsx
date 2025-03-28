
import React from "react";
import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import PreCheckIn from "@/pages/PreCheckIn";
import CheckInConfirmation from "@/pages/CheckInConfirmation";
import Roadmap from "@/pages/Roadmap";
import NotFound from "@/pages/NotFound";

export const PublicRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    
    {/* Public patient-facing routes */}
    <Route path="/pre-check-in" element={<PreCheckIn />} />
    <Route path="/check-in-confirmation" element={<CheckInConfirmation />} />
    
    <Route path="/roadmap" element={<Roadmap />} />
    
    <Route path="*" element={<NotFound />} />
  </>
);
