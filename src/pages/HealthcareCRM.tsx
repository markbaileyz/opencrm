
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResponsiveContainer from "@/components/ui/responsive-container";
import MobileHealthcareCRM from "@/components/healthcare-crm/MobileHealthcareCRM";
import DesktopHealthcareCRM from "@/components/healthcare-crm/DesktopHealthcareCRM";

const HealthcareCRMPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 animate-fade-in">
        <ResponsiveContainer
          mobileView={<MobileHealthcareCRM />}
          desktopView={<DesktopHealthcareCRM />}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthcareCRMPage;
