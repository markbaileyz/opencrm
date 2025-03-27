
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  className?: string;
}

const TestimonialCard = ({ name, role, content, rating, image, className = "" }: TestimonialProps) => {
  return (
    <div className={`relative bg-white rounded-xl p-6 border border-primary/10 shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/30 ${className}`}>
      <div className="flex text-primary mb-4">
        {Array(rating).fill(0).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      
      <blockquote className="mb-4 text-foreground">
        <p className="relative text-base leading-relaxed">
          <span className="absolute -left-2 -top-2 text-3xl text-primary/40">"</span>
          {content}
          <span className="absolute -bottom-4 right-0 text-3xl text-primary/40">"</span>
        </p>
      </blockquote>
      
      <div className="mt-6 pt-4 border-t border-border flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">
            Customer Success
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Trusted by healthcare professionals
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-primary/30" />
            <span className="mx-4 text-primary/80 font-medium">What our users say</span>
            <Separator className="w-12 bg-primary/30" />
          </div>
          <p className="text-lg text-muted-foreground animate-fade-up delay-100">
            See how OpenCRM is transforming healthcare practices across the country
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Dr. Sarah Johnson"
            role="Family Physician"
            content="OpenCRM has transformed my practice. The intuitive interface and seamless patient communication tools have saved us hours each day."
            rating={5}
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374"
            className="animate-fade-up delay-200"
          />
          
          <TestimonialCard
            name="Dr. Michael Chen"
            role="Pediatrician"
            content="My staff loves the scheduling system, and patients appreciate the modern experience. Worth every penny for the time saved and improved patient satisfaction."
            rating={5}
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1374"
            className="animate-fade-up delay-300"
          />
          
          <TestimonialCard
            name="Jessica Rivera"
            role="Practice Manager"
            content="The customer support is exceptional. They've been responsive to our needs and continuously improve the platform based on our feedback."
            rating={4}
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1374"
            className="animate-fade-up delay-400"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
