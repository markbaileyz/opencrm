
import React from "react";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  facility: string;
  delay?: string;
}

const TestimonialCard = ({ quote, name, role, facility, delay = "" }: TestimonialCardProps) => {
  return (
    <div className={`relative h-full bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 border border-primary/10 animate-fade-up ${delay}`}>
      <div className="absolute -top-3 left-6">
        <Badge variant="secondary" className="shadow-sm border border-primary/10">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          5.0
        </Badge>
      </div>
      
      <Quote className="h-8 w-8 text-primary/20 mb-2" />
      
      <blockquote className="mb-4 text-foreground">
        <p className="text-base leading-relaxed font-medium">
          "{quote}"
        </p>
      </blockquote>
      
      <div className="mt-8 pt-4 border-t border-border">
        <p className="font-semibold">{name}</p>
        <div className="flex flex-col text-sm text-muted-foreground">
          <span>{role}</span>
          <span className="font-medium text-primary/80">{facility}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
