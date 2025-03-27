
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";
import { ArrowRight, CheckCircle, Users, Shield, BarChart } from "lucide-react";
import ResponsiveImage from "./ui/responsive-image";

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
    <section className="pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden" id="home">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <CheckCircle className="mr-1 h-3.5 w-3.5" />
                Enterprise-grade CRM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Transform Your Customer Relationships
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Join over 10,000 businesses that use OpenCRM to streamline operations, increase sales, and deliver exceptional customer experiences.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/login">
                <ButtonCustom size="lg" className="group font-medium">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonCustom>
              </Link>
              <Link to="#features">
                <ButtonCustom variant="outline" size="lg" className="font-medium">
                  See Features
                </ButtonCustom>
              </Link>
            </div>
            
            {/* Social proof */}
            <div className="pt-4 flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground font-medium">TRUSTED BY INDUSTRY LEADERS</p>
              <div className="flex flex-wrap items-center gap-8">
                <img src="/logos/acme.svg" alt="Acme Inc" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                <img src="/logos/globex.svg" alt="Globex" className="h-7 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                <img src="/logos/hooli.svg" alt="Hooli" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                <img src="/logos/stark.svg" alt="Stark Industries" className="h-7 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-left">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl transform rotate-1 blur-xl"></div>
            <div className="glass rounded-3xl p-1 relative z-10 border border-white/20 shadow-xl overflow-hidden">
              <ResponsiveImage 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070"
                alt="Professional CRM Dashboard" 
                className="w-full h-full rounded-2xl"
                aspectRatio="16/9"
              />
              
              <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Revenue Increase</h4>
                      <p className="text-2xl font-bold">+27%</p>
                    </div>
                  </div>
                  <div className="h-10 w-[1px] bg-border"></div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Customer Retention</h4>
                      <p className="text-2xl font-bold">94%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg animate-fade-up delay-300">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Enterprise Security</p>
                  <p className="text-xs text-muted-foreground">HIPAA & GDPR Compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 animate-fade-up delay-400">
          <StatBox value="10k+" label="Businesses" />
          <StatBox value="99.9%" label="Uptime" />
          <StatBox value="24/7" label="Support" />
          <StatBox value="1M+" label="Users" />
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
  <div className="glass rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-white/10">
    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{value}</p>
    <p className="text-sm text-muted-foreground mt-1 font-medium">{label}</p>
  </div>
);

export default Hero;
