import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import Roadmap from "@/pages/Roadmap";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
