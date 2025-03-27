
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface EnhancementCardProps {
  title: string;
  description: string;
}

const EnhancementCard: React.FC<EnhancementCardProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const EnhancementsSection = () => {
  const enhancements = [
    {
      title: "Interoperability",
      description: "Seamless integration with EHRs, billing systems, telehealth platforms, and other healthcare tools for unified workflows."
    },
    {
      title: "Real-time Eligibility",
      description: "Direct connections to insurance providers for instant verification of coverage, benefits, and authorization status."
    },
    {
      title: "Telehealth Support",
      description: "Dedicated fields for virtual care management including video visit links, technical notes, and digital waiting rooms."
    },
    {
      title: "Intelligent Scheduling",
      description: "AI-powered appointment optimization that accounts for provider availability, room utilization, and equipment needs."
    },
    {
      title: "Patient Engagement",
      description: "Automated outreach tools for appointment reminders, health education, follow-ups, and preventive care notifications."
    },
    {
      title: "Population Health",
      description: "Analytics tools to identify care gaps, track quality measures, and manage patient cohorts for targeted interventions."
    }
  ];

  return (
    <div className="space-y-4 pt-8">
      <h2 className="text-2xl font-bold tracking-tight">Key CRM Enhancements for Healthcare</h2>
      <p className="text-muted-foreground">Modern healthcare CRMs should include these advanced capabilities:</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
        {enhancements.map((enhancement, index) => (
          <EnhancementCard 
            key={index}
            title={enhancement.title} 
            description={enhancement.description} 
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancementsSection;
