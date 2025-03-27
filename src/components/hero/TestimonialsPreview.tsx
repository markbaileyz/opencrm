
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import TestimonialCard from "./TestimonialCard";

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
    <div className="animate-fade-up">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <CustomLink to="#testimonials">
          <ButtonCustom variant="outline" size="lg" className="font-medium group">
            Read More Success Stories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ButtonCustom>
        </CustomLink>
      </div>
    </div>
  );
};

export default TestimonialsPreview;
