
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CRMFeaturesList from "@/components/CRMFeaturesList";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Roadmap = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary/10 to-background pt-16 pb-12 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">NextCRM Product Roadmap</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              See what features we've implemented and what's coming next in our development journey.
              Use the filters below to focus on specific feature statuses.
            </p>
            <div className="flex justify-center items-center gap-2">
              <Button 
                variant="outline" 
                className="mx-auto"
                onClick={() => {
                  document.getElementById('features-list')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Our Roadmap <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter features</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div id="features-list">
          <CRMFeaturesList />
        </div>
        
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to see the CRM in action?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Try out the existing features and provide feedback to help us improve.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contacts">Manage Contacts</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Roadmap;
