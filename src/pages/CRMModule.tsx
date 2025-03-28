
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CRMModuleContainer from "@/components/crm-modules/CRMModuleContainer";

const CRMModule: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <CRMModuleContainer />
      </main>
      <Footer />
    </div>
  );
};

export default CRMModule;
