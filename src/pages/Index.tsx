
import React, { useRef } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { UserPlus, ChevronDown, Building, User, Calendar, Lightbulb, Heart, Camera, FileImage } from "lucide-react";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const scrollToSection = (sectionId: string) => {
    let targetRef;
    switch (sectionId) {
      case "features":
        targetRef = featuresRef;
        break;
      case "pricing":
        targetRef = pricingRef;
        break;
      case "testimonials":
        targetRef = testimonialsRef;
        break;
      default:
        return;
    }

    if (targetRef.current) {
      const yOffset = -80; // Header height
      const y =
        targetRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrollToSection={scrollToSection} />
      
      <main className="flex-grow">
        <Hero scrollToSection={scrollToSection} />
        
        {/* Pre-Check-In Banner */}
        <div className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-xl bg-white shadow-lg border border-primary/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 z-0"></div>
              <div className="flex-1 relative z-10">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Skip the Wait, Pre-Check-In Online</h2>
                <p className="text-muted-foreground mb-4">Upload your documents, provide your information, and save time on your next visit.</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full">
                    <FileImage className="h-4 w-4 text-primary" />
                    <span>Upload ID</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full">
                    <Camera className="h-4 w-4 text-primary" />
                    <span>Take Photos</span>
                  </div>
                </div>
              </div>
              <Link to="/pre-check-in" className="relative z-10">
                <Button size="lg" className="whitespace-nowrap shadow-md hover:shadow-lg transition-all">
                  Pre-Check-In Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-10 animate-fade-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore Our Industry Solutions</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Specialized CRM solutions tailored for different industries with features designed to meet your unique needs
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
              <Link to="/healthcare-crm" className="animate-fade-up delay-100">
                <div className="h-full group relative bg-white border border-primary/20 hover:border-primary/50 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Healthcare CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Patient & Medical Management</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Active</span>
                </div>
              </Link>
              
              <div className="animate-fade-up delay-200">
                <div className="h-full bg-white/60 border border-border rounded-xl p-6 flex flex-col items-center text-center opacity-70">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">Real Estate CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Property & Client Management</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">Coming Soon</span>
                </div>
              </div>
              
              <div className="animate-fade-up delay-300">
                <div className="h-full bg-white/60 border border-border rounded-xl p-6 flex flex-col items-center text-center opacity-70">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">Education CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Student & Course Management</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">Coming Soon</span>
                </div>
              </div>
              
              <div className="animate-fade-up delay-400">
                <div className="h-full bg-white/60 border border-border rounded-xl p-6 flex flex-col items-center text-center opacity-70">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">Event CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Event & Attendee Management</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">Coming Soon</span>
                </div>
              </div>
              
              <div className="animate-fade-up delay-500">
                <div className="h-full bg-white/60 border border-border rounded-xl p-6 flex flex-col items-center text-center opacity-70">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">Custom CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Build Your Own Solution</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={featuresRef}>
          <Features />
        </div>
        <div ref={pricingRef}>
          <PricingSection />
        </div>
        <div ref={testimonialsRef}>
          <TestimonialsSection />
        </div>
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
