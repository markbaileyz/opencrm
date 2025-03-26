
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HealthcareCRMStrategies from "@/components/HealthcareCRMStrategies";

const HealthcareCRMPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 animate-fade-in">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <HealthcareCRMStrategies />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthcareCRMPage;
