
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import PreCheckInSection from "@/components/hero/PreCheckInSection";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

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
      case "solutions":
        targetRef = solutionsRef;
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
        
        <div className="container mx-auto px-4 py-20" ref={solutionsRef}>
          <div className="text-center mb-10 animate-fade-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore Our Industry Solutions</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Specialized CRM solutions tailored for different industries with features designed to meet your unique needs
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
              {/* Healthcare CRM - Active */}
              <Link to="/healthcare-crm" className="animate-fade-up delay-100">
                <Card className="h-full group relative hover:shadow-md transition-all duration-300 border-primary/20 hover:border-primary">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart h-6 w-6 text-primary">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium">Healthcare CRM</h3>
                    <span className="text-xs text-muted-foreground mt-1 mb-3">Patient & Medical Management</span>
                    <ul className="text-sm text-left space-y-2 mb-5 mt-2">
                      <li className="flex items-start">
                        <span className="bg-green-500/10 p-1 rounded-full mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Patient scheduling
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-500/10 p-1 rounded-full mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Online pre-check-in
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-500/10 p-1 rounded-full mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        HIPAA compliance
                      </li>
                    </ul>
                    <span className="mt-auto inline-flex items-center text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                      Active
                    </span>
                  </CardContent>
                </Card>
              </Link>
              
              {/* Real Estate CRM */}
              <Card className="h-full animate-fade-up delay-200 hover:shadow-sm transition-all duration-300 relative group border-muted/50">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent rounded-xl"></div>
                <CardContent className="p-6 flex flex-col items-center text-center h-full relative">
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
                  <span className="text-xs text-muted-foreground mt-1 mb-3">Property & Client Management</span>
                  <ul className="text-sm text-left space-y-2 mb-5 mt-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Property listings
                    </li>
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Client matching
                    </li>
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Document management
                    </li>
                  </ul>
                  <div className="mt-auto relative z-10">
                    <ButtonCustom 
                      variant="outline" 
                      size="sm" 
                      className="text-xs px-3 py-1 h-auto opacity-80"
                      disabled
                    >
                      Notify Me When Available
                    </ButtonCustom>
                  </div>
                </CardContent>
              </Card>
              
              {/* Education CRM */}
              <Card className="h-full animate-fade-up delay-300 hover:shadow-sm transition-all duration-300 relative group border-muted/50">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent rounded-xl"></div>
                <CardContent className="p-6 flex flex-col items-center text-center h-full relative">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-medium">Education CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-3">Student & Course Management</span>
                  <ul className="text-sm text-left space-y-2 mb-5 mt-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Enrollment tracking
                    </li>
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Course scheduling
                    </li>
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Performance analytics
                    </li>
                  </ul>
                  <div className="mt-auto relative z-10">
                    <ButtonCustom 
                      variant="outline" 
                      size="sm" 
                      className="text-xs px-3 py-1 h-auto opacity-80"
                      disabled
                    >
                      Notify Me When Available
                    </ButtonCustom>
                  </div>
                </CardContent>
              </Card>
              
              {/* Event CRM */}
              <Card className="h-full animate-fade-up delay-400 hover:shadow-sm transition-all duration-300 relative group border-muted/50">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent rounded-xl"></div>
                <CardContent className="p-6 flex flex-col items-center text-center h-full relative">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium">Event CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-3">Event & Attendee Management</span>
                  <ul className="text-sm text-left space-y-2 mb-5 mt-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Registration management
                    </li>
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Venue coordination
                    </li>
                    <li className="flex items-start">
                      <span className="bg-muted p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Ticket sales tracking
                    </li>
                  </ul>
                  <div className="mt-auto relative z-10">
                    <ButtonCustom 
                      variant="outline" 
                      size="sm" 
                      className="text-xs px-3 py-1 h-auto opacity-80"
                      disabled
                    >
                      Notify Me When Available
                    </ButtonCustom>
                  </div>
                </CardContent>
              </Card>
              
              {/* Custom CRM */}
              <Card className="h-full animate-fade-up delay-500 hover:shadow-md transition-all duration-300 relative group border-primary/10 hover:border-primary/30">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb text-amber-600">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                      <path d="M9 18h6"></path>
                      <path d="M10 22h4"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium">Custom CRM</h3>
                  <span className="text-xs text-muted-foreground mt-1 mb-3">Build Your Own Solution</span>
                  <ul className="text-sm text-left space-y-2 mb-5 mt-2">
                    <li className="flex items-start">
                      <span className="bg-amber-500/10 p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Customizable modules
                    </li>
                    <li className="flex items-start">
                      <span className="bg-amber-500/10 p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      API integrations
                    </li>
                    <li className="flex items-start">
                      <span className="bg-amber-500/10 p-1 rounded-full mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Dedicated support
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <ButtonCustom 
                      variant="outline" 
                      size="sm"
                      className="text-xs group inline-flex items-center gap-1"
                    >
                      Contact Us 
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </ButtonCustom>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 max-w-lg mx-auto">
              <Link to="/healthcare-crm">
                <ButtonCustom variant="secondary" className="w-full group">
                  Learn More About Healthcare CRM
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonCustom>
              </Link>
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
