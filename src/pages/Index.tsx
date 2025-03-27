
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
import { UserPlus, ChevronDown, Building, User, Calendar, Lightbulb, Heart } from "lucide-react";

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
        
        <div className="container mx-auto px-4 py-12 mt-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Explore Our Industry Solutions</h2>
            <p className="text-muted-foreground mt-2">Specialized CRM solutions for different industries</p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/healthcare-crm">
                <Button variant="outline" className="h-full py-6 px-4 flex flex-col items-center">
                  <Heart className="h-6 w-6 mb-2 text-primary" />
                  <span className="font-medium">Healthcare CRM</span>
                  <span className="text-xs text-muted-foreground mt-1">Patient & Medical Management</span>
                </Button>
              </Link>
              
              <Button variant="outline" className="h-full py-6 px-4 flex flex-col items-center opacity-70">
                <Building className="h-6 w-6 mb-2" />
                <span className="font-medium">Real Estate CRM</span>
                <span className="text-xs text-muted-foreground mt-1">Property & Client Management</span>
              </Button>
              
              <Button variant="outline" className="h-full py-6 px-4 flex flex-col items-center opacity-70">
                <User className="h-6 w-6 mb-2" />
                <span className="font-medium">Education CRM</span>
                <span className="text-xs text-muted-foreground mt-1">Student & Course Management</span>
              </Button>
              
              <Button variant="outline" className="h-full py-6 px-4 flex flex-col items-center opacity-70">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="font-medium">Event CRM</span>
                <span className="text-xs text-muted-foreground mt-1">Event & Attendee Management</span>
              </Button>
              
              <Button variant="outline" className="h-full py-6 px-4 flex flex-col items-center opacity-70">
                <Lightbulb className="h-6 w-6 mb-2" />
                <span className="font-medium">Custom CRM</span>
                <span className="text-xs text-muted-foreground mt-1">Build Your Own Solution</span>
              </Button>
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
