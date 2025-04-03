
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
    <div className="animate-fade-up py-16 relative overflow-hidden bg-gray-50">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4 shadow-sm bg-blue-100 text-blue-700 border border-blue-200">
            <Users className="h-3.5 w-3.5 mr-1" />
            Trusted Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4 text-gray-900">
            {title}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-blue-200" />
            <span className="mx-4 text-blue-700 font-medium">Industry Leaders</span>
            <Separator className="w-12 bg-blue-200" />
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center px-4">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className={`p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-100 hover:translate-y-[-3px] animate-fade-up delay-${(index + 1) * 100}`}
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
