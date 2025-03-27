
import React from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  facility: string;
}

const TestimonialCard = ({ quote, name, role, facility }: TestimonialCardProps) => {
  return (
    <div className="relative h-full bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/20 border border-primary/5">
      <div className="absolute -top-3 left-6">
        <Badge variant="primary" className="shadow-sm">
          Testimonial
        </Badge>
      </div>
      
      <div className="flex text-primary mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      
      <blockquote className="mb-4 text-foreground">
        <p className="relative text-base leading-relaxed">
          <span className="absolute -left-2 -top-2 text-3xl text-primary/40">"</span>
          {quote}
          <span className="absolute -bottom-4 right-0 text-3xl text-primary/40">"</span>
        </p>
      </blockquote>
      
      <div className="mt-8 pt-4 border-t border-border">
        <p className="font-semibold">{name}</p>
        <div className="flex flex-col text-sm text-muted-foreground">
          <span>{role}</span>
          <span>{facility}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
