
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ResponsiveImage from "@/components/ui/responsive-image";

interface TrustedBySectionProps {
  title: string;
  description: string;
  logos: string[];
}

const TrustedBySection = ({ title, description, logos }: TrustedBySectionProps) => {
  return (
    <div className="animate-fade-up py-16 md:py-24 relative dark-container overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4 shadow-md bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1.5">
            <Users className="h-3.5 w-3.5 mr-1" />
            Trusted Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4 text-white">
            {title}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-blue-400/30" />
            <span className="mx-4 text-blue-300 font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-blue-400/80" />
              Industry Leaders
            </span>
            <Separator className="w-12 bg-blue-400/30" />
          </div>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 items-center justify-items-center px-4">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className={`p-6 bg-[#0f1c36] rounded-xl border border-blue-500/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-500/30 hover:translate-y-[-3px] animate-fade-up delay-${(index + 1) * 100}`}
            >
              <ResponsiveImage
                src={logo}
                alt={`Partner logo ${index + 1}`}
                className="h-12 w-auto object-contain"
                fallbackSrc="/placeholder.svg"
                loadingComponent={
                  <div className="h-12 w-36 bg-blue-500/10 animate-pulse rounded"></div>
                }
              />
            </div>
          ))}
        </div>
        
        {/* Add trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-blue-300/80">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">HIPAA Compliant</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">99.9% Uptime</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">24/7 Support</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;
