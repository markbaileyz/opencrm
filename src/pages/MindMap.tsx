
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MindMap from "@/components/MindMap";

const MindMapPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">OpenSRM Mind Map</h1>
          <p className="text-muted-foreground mb-8">
            Visualize the structure and organization of our platform
          </p>
          
          <MindMap />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MindMapPage;
