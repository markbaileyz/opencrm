
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

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
    <div className={`relative p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-100 hover:translate-y-[-3px] ${className}`}>
      <div className="flex text-yellow-400 mb-4">
        {Array(rating).fill(0).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400" />
        ))}
      </div>
      
      <Quote className="h-8 w-8 text-blue-100 mb-2" />
      
      <blockquote className="mb-4 text-gray-800">
        <p className="relative text-base leading-relaxed">
          <span className="absolute -left-2 -top-2 text-3xl text-blue-100">"</span>
          {content}
          <span className="absolute -bottom-4 right-0 text-3xl text-blue-100">"</span>
        </p>
      </blockquote>
      
      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-200">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-blue-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4 shadow-sm bg-blue-100 text-blue-700 border border-blue-200">
            Customer Success
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up text-gray-800">
            Trusted by healthcare professionals
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-blue-300" />
            <span className="mx-4 text-blue-700 font-medium">What our users say</span>
            <Separator className="w-12 bg-blue-300" />
          </div>
          <p className="text-lg text-gray-600 animate-fade-up delay-100">
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
