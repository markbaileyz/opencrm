
import React from "react";
import { Check, MessageSquare, Calendar, ClipboardList, Shield, Users } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All-in-one healthcare platform
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to manage your practice and provide the best care for your patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MessageSquare className="h-6 w-6 text-primary" />}
            title="Patient Messaging"
            description="Secure messaging system to communicate with patients and coordinate care."
            delay="delay-100"
          >
            <ul className="mt-4 space-y-2">
              <FeatureItem>HIPAA-compliant messaging</FeatureItem>
              <FeatureItem>File and image sharing</FeatureItem>
              <FeatureItem>Message templates</FeatureItem>
            </ul>
          </FeatureCard>

          <FeatureCard
            icon={<Calendar className="h-6 w-6 text-primary" />}
            title="Scheduling"
            description="Streamline appointment scheduling and reduce no-shows."
            delay="delay-200"
          >
            <ul className="mt-4 space-y-2">
              <FeatureItem>Online booking</FeatureItem>
              <FeatureItem>Automated reminders</FeatureItem>
              <FeatureItem>Flexible scheduling options</FeatureItem>
            </ul>
          </FeatureCard>

          <FeatureCard
            icon={<ClipboardList className="h-6 w-6 text-primary" />}
            title="Documentation"
            description="Create and manage clinical documentation efficiently."
            delay="delay-300"
          >
            <ul className="mt-4 space-y-2">
              <FeatureItem>Customizable templates</FeatureItem>
              <FeatureItem>Document collaboration</FeatureItem>
              <FeatureItem>Automated workflows</FeatureItem>
            </ul>
          </FeatureCard>

          <FeatureCard
            icon={<Shield className="h-6 w-6 text-primary" />}
            title="Security & Compliance"
            description="Enterprise-grade security that meets healthcare standards."
            delay="delay-100"
          >
            <ul className="mt-4 space-y-2">
              <FeatureItem>HIPAA compliance</FeatureItem>
              <FeatureItem>End-to-end encryption</FeatureItem>
              <FeatureItem>Role-based access control</FeatureItem>
            </ul>
          </FeatureCard>

          <FeatureCard
            icon={<Users className="h-6 w-6 text-primary" />}
            title="Team Collaboration"
            description="Work efficiently with your entire care team."
            delay="delay-200"
          >
            <ul className="mt-4 space-y-2">
              <FeatureItem>Task assignment</FeatureItem>
              <FeatureItem>Care coordination</FeatureItem>
              <FeatureItem>Shared calendars</FeatureItem>
            </ul>
          </FeatureCard>

          <FeatureCard
            icon={<ClipboardList className="h-6 w-6 text-primary" />}
            title="Patient Portal"
            description="Give patients access to their health information."
            delay="delay-300"
          >
            <ul className="mt-4 space-y-2">
              <FeatureItem>Medical records access</FeatureItem>
              <FeatureItem>Appointment requests</FeatureItem>
              <FeatureItem>Secure messaging</FeatureItem>
            </ul>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  delay?: string;
}

const FeatureCard = ({ icon, title, description, children, delay }: FeatureCardProps) => {
  return (
    <div className={`glass rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-fade-up ${delay}`}>
      <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {children}
    </div>
  );
};

// Feature Item Component
interface FeatureItemProps {
  children: React.ReactNode;
}

const FeatureItem = ({ children }: FeatureItemProps) => {
  return (
    <li className="flex items-center text-sm">
      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
};

export default Features;
