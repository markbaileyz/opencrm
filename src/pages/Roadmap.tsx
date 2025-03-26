
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CRMFeaturesList from "@/components/CRMFeaturesList";

const Roadmap = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <CRMFeaturesList />
      </main>
      
      <Footer />
    </div>
  );
};

export default Roadmap;
