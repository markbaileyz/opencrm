
import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  className?: string;
}

const TestimonialCard = ({
  name,
  role,
  content,
  rating,
  image,
  className = "",
}: TestimonialCardProps) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
      </div>
      <p className="text-foreground mb-4">{content}</p>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
