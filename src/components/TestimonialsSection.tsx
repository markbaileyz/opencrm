
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
    <div className={`relative dark-card p-6 border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-500/20 ${className}`}>
      <div className="flex text-yellow-400 mb-4">
        {Array(rating).fill(0).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400" />
        ))}
      </div>
      
      <Quote className="h-8 w-8 text-blue-400/30 mb-2" />
      
      <blockquote className="mb-4 text-white">
        <p className="relative text-base leading-relaxed">
          <span className="absolute -left-2 -top-2 text-3xl text-blue-400/40">"</span>
          {content}
          <span className="absolute -bottom-4 right-0 text-3xl text-blue-400/40">"</span>
        </p>
      </blockquote>
      
      <div className="mt-8 pt-4 border-t border-white/10 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-blue-500/20">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-blue-300">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 dark-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4 shadow-sm bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Customer Success
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up text-white">
            Trusted by healthcare professionals
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-blue-400/30" />
            <span className="mx-4 text-blue-300 font-medium">What our users say</span>
            <Separator className="w-12 bg-blue-400/30" />
          </div>
          <p className="text-lg text-white/70 animate-fade-up delay-100">
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
