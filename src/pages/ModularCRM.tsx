
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CRMDashboard from "@/components/crm-config/CRMDashboard";

const ModularCRM: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <CRMDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default ModularCRM;
