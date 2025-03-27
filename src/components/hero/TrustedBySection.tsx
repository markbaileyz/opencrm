
import React from "react";

interface TrustedBySectionProps {
  title: string;
  description: string;
  logos: string[];
}

const TrustedBySection = ({ title, description, logos }: TrustedBySectionProps) => {
  return (
    <div className="animate-fade-up">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        {logos.map((logo, index) => (
          <div key={index} className="p-4 glass rounded-xl hover:shadow-lg transition-all duration-300">
            <img src={logo} alt={`Partner logo ${index + 1}`} className="h-10 w-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedBySection;
