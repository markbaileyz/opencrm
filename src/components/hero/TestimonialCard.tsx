
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
    <div className={`relative h-full bg-white backdrop-blur-sm rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-blue-100 animate-fade-up ${delay}`}>
      <div className="absolute -top-3 left-6">
        <Badge variant="secondary" className="shadow-sm border border-yellow-200 bg-yellow-50 text-yellow-700">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          5.0
        </Badge>
      </div>
      
      <Quote className="h-8 w-8 text-blue-100 mb-2" />
      
      <blockquote className="mb-4 text-gray-800">
        <p className="text-base leading-relaxed font-medium">
          "{quote}"
        </p>
      </blockquote>
      
      <div className="mt-8 pt-4 border-t border-gray-100">
        <p className="font-semibold text-gray-900">{name}</p>
        <div className="flex flex-col text-sm">
          <span className="text-gray-500">{role}</span>
          <span className="font-medium text-blue-600">{facility}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
