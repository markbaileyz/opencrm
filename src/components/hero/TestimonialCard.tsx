
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
    <div className={`relative h-full bg-[#0a1527]/95 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-white/10 animate-fade-up ${delay}`}>
      <div className="absolute -top-3 left-6">
        <Badge variant="secondary" className="shadow-sm border border-yellow-400/30 bg-yellow-500/20 text-yellow-300">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          5.0
        </Badge>
      </div>
      
      <Quote className="h-8 w-8 text-blue-400/30 mb-2" />
      
      <blockquote className="mb-4 text-white">
        <p className="text-base leading-relaxed font-medium">
          "{quote}"
        </p>
      </blockquote>
      
      <div className="mt-8 pt-4 border-t border-white/10">
        <p className="font-semibold text-white">{name}</p>
        <div className="flex flex-col text-sm text-white/70">
          <span>{role}</span>
          <span className="font-medium text-blue-300">{facility}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
