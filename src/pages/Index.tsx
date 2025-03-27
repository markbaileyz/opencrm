
import React, { useRef } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import PreCheckInSection from "@/components/hero/PreCheckInSection";

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
        
        <div className="container mx-auto px-4">
          <PreCheckInSection />
        </div>
        
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-10 animate-fade-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore Our Industry Solutions</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Specialized CRM solutions tailored for different industries with features designed to meet your unique needs
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
              {/* Healthcare CRM - Active */}
              <div className="animate-fade-up delay-100">
                <div className="h-full group relative bg-white border border-primary/20 hover:border-primary/50 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart h-6 w-6 text-primary">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium">Healthcare CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Patient & Medical Management</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Active</span>
                </div>
              </div>
              
              {/* Remaining industry cards */}
              <div className="animate-fade-up delay-200">
                <div className="h-full bg-white/60 border border-border rounded-xl p-6 flex flex-col items-center text-center opacity-70">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building">
                      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                      <path d="M9 22v-4h6v4"></path>
                      <path d="M8 6h.01"></path>
                      <path d="M16 6h.01"></path>
                      <path d="M12 6h.01"></path>
                      <path d="M12 10h.01"></path>
                      <path d="M12 14h.01"></path>
                      <path d="M16 10h.01"></path>
                      <path d="M16 14h.01"></path>
                      <path d="M8 10h.01"></path>
                      <path d="M8 14h.01"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium">Real Estate CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Property & Client Management</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">Coming Soon</span>
                </div>
              </div>
              
              <div className="animate-fade-up delay-300">
                <div className="h-full bg-white/60 border border-border rounded-xl p-6 flex flex-col items-center text-center opacity-70">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-medium">Education CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Student & Course Management</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">Coming Soon</span>
                </div>
              </div>
              
              <div className="animate-fade-up delay-400">
                <div className="h-full bg-white/60 border border-border rounded-xl p-6 flex flex-col items-center text-center opacity-70">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium">Event CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-2">Event & Attendee Management</span>
                  <span className="mt-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">Coming Soon</span>
                </div>
              </div>
              
              <div className="animate-fade-up delay-500">
                <div className="h-full bg-white/60 border border-border rounded-xl p-6 flex flex-col items-center text-center opacity-70">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                      <path d="M9 18h6"></path>
                      <path d="M10 22h4"></path>
                    </svg>
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
