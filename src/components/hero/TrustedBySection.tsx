
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Check, Calendar, Building, GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ui/responsive-image";

interface TrustedBySectionProps {
  title: string;
  description: string;
  logos: string[];
}

const TrustedBySection = ({ title, description, logos }: TrustedBySectionProps) => {
  // Industry solutions data
  const industrySolutions = [
    {
      title: "Healthcare CRM",
      subtitle: "Patient & Medical Management",
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      features: [
        "Patient scheduling",
        "Online pre-check-in",
        "HIPAA compliance"
      ],
      isActive: true
    },
    {
      title: "Real Estate CRM",
      subtitle: "Property & Client Management",
      icon: <Building className="h-6 w-6 text-blue-400" />,
      features: [
        "Property listings",
        "Client matching",
        "Document management"
      ],
      isActive: false
    },
    {
      title: "Education CRM",
      subtitle: "Student & Course Management",
      icon: <GraduationCap className="h-6 w-6 text-blue-400" />,
      features: [
        "Enrollment tracking",
        "Course scheduling",
        "Performance analytics"
      ],
      isActive: false
    },
    {
      title: "Event CRM",
      subtitle: "Event & Attendee Management",
      icon: <Calendar className="h-6 w-6 text-blue-400" />,
      features: [
        "Registration management",
        "Venue coordination",
        "Ticket sales tracking"
      ],
      isActive: false
    }
  ];

  return (
    <div className="py-16 md:py-24 relative bg-[#0a1527] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4 shadow-md bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1.5">
            <Users className="h-3.5 w-3.5 mr-1" />
            Industry Solutions
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4 text-white">
            Explore Our Industry Solutions
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-blue-400/30" />
            <span className="mx-4 text-blue-300 font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-blue-400/80" />
              Specialized Solutions
            </span>
            <Separator className="w-12 bg-blue-400/30" />
          </div>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Specialized CRM solutions tailored for different industries with features designed to meet your unique needs
          </p>
        </div>
        
        {/* Industry solutions cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industrySolutions.map((solution, index) => (
            <div 
              key={index} 
              className={`${solution.isActive ? "bg-[#0a1527] border-blue-500/20 hover:border-blue-500/30" : "bg-[#101a30]/80 border-blue-500/10 hover:border-blue-500/20"} border text-white rounded-xl p-6 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden`}
            >
              {solution.isActive && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300"></div>
              )}
              
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-900/30 rounded-full">
                  {solution.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-center mb-1">{solution.title}</h3>
              <p className="text-sm text-blue-200/70 text-center mb-4">{solution.subtitle}</p>
              
              <ul className="space-y-3 mb-6">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-4 w-4 text-blue-400 mr-2 mt-1 shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center">
                {solution.isActive ? (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-600/30 text-blue-300 text-sm rounded-full">
                    Active
                  </span>
                ) : (
                  <button className="inline-flex items-center px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded-full hover:bg-blue-900/50 transition-colors">
                    Notify Me When Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* "Learn more" button */}
        <div className="flex justify-center mt-12">
          <Link 
            to="/healthcare-crm" 
            className="group relative inline-flex items-center gap-1.5 rounded-lg bg-[#1a2a4a] hover:bg-[#1e305a] px-6 py-3 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Learn More About Healthcare CRM
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        {/* Partner logos section at the bottom */}
        <div className="mt-24">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-white mb-2">Trusted by Leading Organizations</h3>
            <p className="text-white/60">Join thousands of organizations that rely on our CRM solutions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-60">
            {logos.map((logo, index) => (
              <div 
                key={index} 
                className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-lg"
              >
                <ResponsiveImage
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  className="h-8 w-auto object-contain"
                  fallbackSrc="/placeholder.svg"
                  loadingComponent={
                    <div className="h-8 w-32 bg-blue-500/10 animate-pulse rounded"></div>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;
