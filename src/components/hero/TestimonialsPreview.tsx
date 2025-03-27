
import React from "react";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import TestimonialCard from "./TestimonialCard";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface TestimonialsPreviewProps {
  title: string;
  description: string;
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    facility: string;
  }>;
  scrollToSection: (sectionId: string) => void;
}

const TestimonialsPreview = ({ 
  title, 
  description, 
  testimonials,
  scrollToSection 
}: TestimonialsPreviewProps) => {
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
    <div className="animate-fade-up py-12 md:py-16 bg-[#0a1527]/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl my-12">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4 bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Quote className="h-3.5 w-3.5 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4 text-white">
              {title}
            </h2>
            <div className="flex items-center justify-center mb-6">
              <Separator className="w-12 bg-blue-400/30" />
              <span className="mx-4 text-blue-300 font-medium">Trusted by Healthcare Professionals</span>
              <Separator className="w-12 bg-blue-400/30" />
            </div>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                facility={testimonial.facility}
                delay={`delay-${(index + 1) * 100}`}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <CustomLink to="#testimonials">
              <ButtonCustom variant="outline" size="lg" className="font-medium group shadow-sm hover:shadow-md bg-[#132543] text-white border-white/20 hover:bg-[#1a3056]">
                Read More Success Stories
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonCustom>
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPreview;
