
import React from "react";
import { CheckCircle } from "lucide-react";
import ResponsiveImage from "@/components/ui/responsive-image";

interface PerspectiveSectionProps {
  title: string;
  icon: React.ReactNode;
  heading: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  statIcon: React.ReactNode;
  statLabel: string;
  statValue: string;
  isReversed?: boolean;
}

const PerspectiveSection = ({
  title,
  icon,
  heading,
  description,
  features,
  imageSrc,
  imageAlt,
  statIcon,
  statLabel,
  statValue,
  isReversed = false,
}: PerspectiveSectionProps) => {
  const contentSection = (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {icon}
          {title}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
        {heading}
      </h2>
      <p className="text-lg text-muted-foreground">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const imageSection = (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl transform rotate-1 blur-xl"></div>
      <div className="glass rounded-3xl p-1 relative z-10 border border-white/20 shadow-xl overflow-hidden">
        <ResponsiveImage 
          src={imageSrc}
          alt={imageAlt} 
          className="w-full h-full rounded-2xl"
          aspectRatio="16/9"
        />
        
        <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full">
                {statIcon}
              </div>
              <div>
                <h4 className="font-medium text-sm">{statLabel}</h4>
                <p className="text-2xl font-bold">{statValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {isReversed ? (
        <>
          <div className="order-2 md:order-1">{imageSection}</div>
          <div className="order-1 md:order-2">{contentSection}</div>
        </>
      ) : (
        <>
          {contentSection}
          {imageSection}
        </>
      )}
    </div>
  );
};

export default PerspectiveSection;
