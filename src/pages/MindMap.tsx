
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MindMap from "@/components/MindMap";

const MindMapPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 animate-fade-in">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">OpenSRM Structure</h1>
            <p className="text-muted-foreground mb-8">
              A visual guide to the organization and architecture of our platform
            </p>
            
            <div className="bg-card rounded-lg shadow-sm p-4">
              <MindMap />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MindMapPage;
