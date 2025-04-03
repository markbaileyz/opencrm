
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
    <div className="animate-fade-up py-12 md:py-16 bg-white backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm my-12">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4 bg-blue-100 text-blue-700 border border-blue-200">
              <Quote className="h-3.5 w-3.5 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4 text-gray-900">
              {title}
            </h2>
            <div className="flex items-center justify-center mb-6">
              <Separator className="w-12 bg-blue-200" />
              <span className="mx-4 text-blue-700 font-medium">Trusted by Healthcare Professionals</span>
              <Separator className="w-12 bg-blue-200" />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
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
              <ButtonCustom variant="outline" size="lg" className="font-medium group shadow-sm hover:shadow-md bg-white text-blue-700 border-blue-200 hover:bg-blue-50">
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
