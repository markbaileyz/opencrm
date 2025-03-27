
import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  facility: string;
}

const TestimonialCard = ({ quote, name, role, facility }: TestimonialCardProps) => (
  <Card className="glass border-white/10 hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6">
      <div className="mb-4">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-primary fill-primary" />
          ))}
        </div>
      </div>
      <p className="mb-6 text-foreground">{quote}</p>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{role}, {facility}</p>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialCard;
