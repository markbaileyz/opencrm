
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleSelector from "@/components/crm-config/ModuleSelector";
import { useCRM } from "@/contexts/CRMContext";

const CRMConfig: React.FC = () => {
  const { modules } = useCRM();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Configure Your CRM</h1>
          <ModuleSelector modules={modules} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CRMConfig;
