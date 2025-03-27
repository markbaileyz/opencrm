
import React from "react";
import TestimonialCard from "@/components/TestimonialCard";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
