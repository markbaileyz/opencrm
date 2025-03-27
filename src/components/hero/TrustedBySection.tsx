
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TrustedBySectionProps {
  title: string;
  description: string;
  logos: string[];
}

const TrustedBySection = ({ title, description, logos }: TrustedBySectionProps) => {
  return (
    <div className="animate-fade-up py-16 relative">
      {/* Background decoration */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4 shadow-sm">
            <Users className="h-3.5 w-3.5 mr-1" />
            Trusted Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-primary/30" />
            <span className="mx-4 text-primary/80 font-medium">Industry Leaders</span>
            <Separator className="w-12 bg-primary/30" />
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className={`p-6 bg-white rounded-xl border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/20 animate-fade-up delay-${(index + 1) * 100}`}
            >
              <img src={logo} alt={`Partner logo ${index + 1}`} className="h-12 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;
