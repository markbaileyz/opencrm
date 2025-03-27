
import React from "react";
import { Check, MessageSquare, Calendar, ClipboardList, Shield, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  delay?: string;
  accentColor: string;
  iconBgColor: string;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  children, 
  delay = "",
  accentColor,
  iconBgColor
}: FeatureCardProps) => {
  return (
    <div className={`relative overflow-hidden bg-[#132543] rounded-xl p-6 border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 group animate-fade-up ${delay}`}>
      {/* Accent color top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`}></div>
      
      <div className={`rounded-full ${iconBgColor} w-12 h-12 flex items-center justify-center mb-5`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-white/70 mb-4">{description}</p>
      {children}
      
      <Link to="/healthcare-crm" className="inline-flex items-center text-sm mt-4 text-blue-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

interface FeatureItemProps {
  children: React.ReactNode;
}

const FeatureItem = ({ children }: FeatureItemProps) => {
  return (
    <li className="flex items-center text-sm text-white/80">
      <div className="rounded-full bg-green-500/20 p-0.5 mr-2">
        <Check className="h-3.5 w-3.5 text-green-400" />
      </div>
      <span>{children}</span>
    </li>
  );
};

const Features = () => {
  // Feature cards data with different accent colors
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
      title: "Patient Messaging",
      description: "Secure messaging system to communicate with patients and coordinate care.",
      accentColor: "bg-blue-500",
      iconBgColor: "bg-blue-500/20",
      delay: "delay-100",
      items: ["HIPAA-compliant messaging", "File and image sharing", "Message templates"]
    },
    {
      icon: <Calendar className="h-6 w-6 text-indigo-400" />,
      title: "Scheduling",
      description: "Streamline appointment scheduling and reduce no-shows.",
      accentColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-500/20",
      delay: "delay-200",
      items: ["Online booking", "Automated reminders", "Flexible scheduling options"]
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-violet-400" />,
      title: "Documentation",
      description: "Create and manage clinical documentation efficiently.",
      accentColor: "bg-violet-500",
      iconBgColor: "bg-violet-500/20",
      delay: "delay-300",
      items: ["Customizable templates", "Document collaboration", "Automated workflows"]
    },
    {
      icon: <Shield className="h-6 w-6 text-green-400" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security that meets healthcare standards.",
      accentColor: "bg-green-500",
      iconBgColor: "bg-green-500/20",
      delay: "delay-100",
      items: ["HIPAA compliance", "End-to-end encryption", "Role-based access control"]
    },
    {
      icon: <Users className="h-6 w-6 text-amber-400" />,
      title: "Team Collaboration",
      description: "Work efficiently with your entire care team.",
      accentColor: "bg-amber-500",
      iconBgColor: "bg-amber-500/20",
      delay: "delay-200",
      items: ["Task assignment", "Care coordination", "Shared calendars"]
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-rose-400" />,
      title: "Patient Portal",
      description: "Give patients access to their health information.",
      accentColor: "bg-rose-500",
      iconBgColor: "bg-rose-500/20",
      delay: "delay-300",
      items: ["Medical records access", "Appointment requests", "Secure messaging"]
    }
  ];

  return (
    <section id="features" className="relative py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#0a1527]/95 pointer-events-none rounded-2xl border border-white/10 shadow-xl"></div>
      <div className="absolute top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <Badge variant="primary" className="mb-4 shadow-sm bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            All-in-one healthcare platform
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-blue-400/30" />
            <span className="mx-4 text-blue-300 font-medium">Powerful Features</span>
            <Separator className="w-12 bg-blue-400/30" />
          </div>
          <p className="text-lg text-white/70">
            Everything you need to manage your practice and provide the best care for your patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
              iconBgColor={feature.iconBgColor}
              delay={feature.delay}
            >
              <ul className="mt-4 space-y-2">
                {feature.items.map((item, i) => (
                  <FeatureItem key={i}>{item}</FeatureItem>
                ))}
              </ul>
            </FeatureCard>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/healthcare-crm">
            <ButtonCustom size="lg" className="shadow-md hover:shadow-lg bg-blue-600 hover:bg-blue-700 text-white">
              Explore All Features
              <ChevronRight className="ml-2 h-5 w-5" />
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
