import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, ClipboardCheck, Shield } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import ResponsiveImage from "@/components/ui/responsive-image";
import { Badge } from "@/components/ui/badge";

interface MainHeroProps {
  scrollToSection: (sectionId: string) => void;
}

const MainHero = ({ scrollToSection }: MainHeroProps) => {
  // Link component that handles both router links and anchor links
  const CustomLink = ({ to, children, ...props }: { to: string, children: React.ReactNode, [key: string]: any }) => {
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
    
    return <Link to={to} {...props}>{children}</Link>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 animate-fade-up">
        <div className="flex items-center space-x-2">
          <Badge variant="primary" className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Healthcare-specific CRM
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Transform Your Patient Relationships
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          Join over 10,000 healthcare practices that use OpenCRM to streamline operations, enhance patient care, and deliver exceptional healthcare experiences.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <CustomLink to="/login">
            <ButtonCustom size="lg" className="group font-medium shadow-md hover:shadow-lg">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonCustom>
          </CustomLink>
          <CustomLink to="#features">
            <ButtonCustom variant="outline" size="lg" className="font-medium">
              See Features
            </ButtonCustom>
          </CustomLink>
        </div>
      </div>
      
      <div className="relative animate-fade-left">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl transform rotate-1 blur-xl"></div>
        <div className="glass rounded-3xl p-1 relative z-10 border border-white/20 shadow-xl overflow-hidden">
          <ResponsiveImage 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000"
            alt="Healthcare professionals discussing patient data on a tablet" 
            className="w-full h-full rounded-2xl"
            aspectRatio="16/9"
          />
          
          <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Patient Satisfaction</h4>
                  <p className="text-2xl font-bold">+38%</p>
                </div>
              </div>
              <div className="h-10 w-[1px] bg-border"></div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Check-in Time</h4>
                  <p className="text-2xl font-bold">-65%</p>
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
              <p className="font-medium text-sm">HIPAA Compliant</p>
              <p className="text-xs text-muted-foreground">Secure Patient Data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
