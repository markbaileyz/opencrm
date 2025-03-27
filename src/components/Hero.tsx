
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const location = useLocation();
  
  // Function to smoothly scroll to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Link component that handles both router links and anchor links
  const Link = ({ to, children, ...props }: { to: string, children: React.ReactNode, [key: string]: any }) => {
    if (to.startsWith('#')) {
      return (
        <a
          href={to}
          onClick={(e) => {
            e.preventDefault();
            const sectionId = to.substring(1);
            scrollToSection(sectionId);
          }}
          {...props}
        >
          {children}
        </a>
      );
    }
    
    return <RouterLink to={to} {...props}>{children}</RouterLink>;
  };

  return (
    <section className="pt-24 pb-16 md:pt-36 md:pb-24" id="home">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Customer management simplified
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Your complete CRM solution
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              OpenCRM makes it easy to connect with customers and provide the best service possible, all in one intuitive platform.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/login">
                <ButtonCustom className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonCustom>
              </Link>
              <Link to="#features">
                <ButtonCustom variant="outline">Learn More</ButtonCustom>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-fade-left delay-200">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-3xl transform rotate-1"></div>
            <div className="glass rounded-3xl p-6 relative z-10">
              <div className="aspect-video rounded-xl overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1470" 
                  alt="Customer Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="glass absolute -bottom-8 -left-8 p-4 rounded-xl shadow-lg animate-fade-up delay-300">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Secure customer portal</p>
                  <p className="text-xs text-muted-foreground">Fully encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 animate-fade-up delay-400">
          <StatBox value="98%" label="Customer satisfaction" />
          <StatBox value="24/7" label="Support available" />
          <StatBox value="10k+" label="Businesses using OpenCRM" />
          <StatBox value="1M+" label="Customers managed" />
        </div>
      </div>
    </section>
  );
};

// Stat box component
interface StatBoxProps {
  value: string;
  label: string;
}

const StatBox = ({ value, label }: StatBoxProps) => (
  <div className="glass rounded-xl p-6 text-center">
    <p className="text-3xl font-bold text-primary">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

export default Hero;
