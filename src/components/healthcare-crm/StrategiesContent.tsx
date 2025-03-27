
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Building, ChartBar, Layers, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrategyItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "implemented" | "in-progress" | "planned";
  features: string[];
  benefits: string[];
  className?: string;
}

const StrategyItem: React.FC<StrategyItemProps> = ({
  title,
  description,
  icon,
  status,
  features,
  benefits,
  className,
}) => {
  return (
    <Card className={cn("mb-6 overflow-hidden border-l-4", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              {icon}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <StatusBadge status={status} />
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-medium">Key Features</h4>
            <ul className="space-y-1 text-sm">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Benefits</h4>
            <ul className="space-y-1 text-sm">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusBadge: React.FC<{ status: "implemented" | "in-progress" | "planned" }> = ({ status }) => {
  const variants = {
    implemented: {
      className: "bg-green-100 text-green-800 border-green-300",
      icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
      label: "Implemented",
    },
    "in-progress": {
      className: "bg-blue-100 text-blue-800 border-blue-300",
      icon: <Clock className="h-3.5 w-3.5 mr-1" />,
      label: "In Progress",
    },
    planned: {
      className: "bg-amber-50 text-amber-800 border-amber-300",
      icon: <Clock className="h-3.5 w-3.5 mr-1" />,
      label: "Planned",
    },
  };

  const { className, icon, label } = variants[status];

  return (
    <Badge variant="outline" className={className}>
      <span className="flex items-center">
        {icon}
        {label}
      </span>
    </Badge>
  );
};

const StrategiesContent: React.FC = () => {
  const strategies: StrategyItemProps[] = [
    {
      title: "Patient Relationship Management",
      description: "Comprehensive tools for managing patient relationships and improving care coordination",
      icon: <Users className="h-5 w-5" />,
      status: "implemented",
      className: "border-l-green-500",
      features: [
        "Patient demographics and history tracking",
        "Appointment scheduling and reminders",
        "Care plan management",
        "Patient portal integration",
        "Communication preference management"
      ],
      benefits: [
        "Improved patient satisfaction and retention",
        "Enhanced care coordination",
        "Reduced administrative burden",
        "More personalized patient experience",
        "Streamlined patient communication"
      ]
    },
    {
      title: "Healthcare Provider Collaboration",
      description: "Tools to improve collaboration between healthcare providers and specialists",
      icon: <Building className="h-5 w-5" />,
      status: "in-progress",
      className: "border-l-blue-500",
      features: [
        "Secure provider messaging system",
        "Referral management workflow",
        "Shared patient records access",
        "Treatment plan collaboration",
        "Real-time consultation tools"
      ],
      benefits: [
        "Faster specialist consultations",
        "Improved care continuity",
        "Reduced duplicate testing",
        "Enhanced team-based care",
        "Better informed clinical decisions"
      ]
    },
    {
      title: "Healthcare Analytics",
      description: "Data analytics solutions for improving clinical outcomes and operational efficiency",
      icon: <ChartBar className="h-5 w-5" />,
      status: "in-progress",
      className: "border-l-blue-500",
      features: [
        "Clinical outcomes tracking",
        "Population health management",
        "Operational efficiency metrics",
        "Financial performance analytics",
        "Customizable reporting dashboards"
      ],
      benefits: [
        "Data-driven decision making",
        "Improved resource allocation",
        "Enhanced quality of care measurement",
        "Identification of process improvement opportunities",
        "Optimized revenue cycle management"
      ]
    },
    {
      title: "Integrated Care Management",
      description: "Unified patient care management across different healthcare settings and specialties",
      icon: <Layers className="h-5 w-5" />,
      status: "planned",
      className: "border-l-amber-500",
      features: [
        "Cross-specialty care coordination",
        "Transition of care management",
        "Chronic disease management protocols",
        "Risk stratification tools",
        "Care gap identification"
      ],
      benefits: [
        "Reduced hospital readmissions",
        "Improved chronic disease outcomes",
        "Enhanced preventative care delivery",
        "Better care transitions",
        "Increased adherence to care plans"
      ]
    },
    {
      title: "Healthcare Compliance Management",
      description: "Tools to ensure compliance with healthcare regulations and standards",
      icon: <Shield className="h-5 w-5" />,
      status: "planned",
      className: "border-l-amber-500",
      features: [
        "HIPAA compliance tracking",
        "Regulatory requirement management",
        "Audit trail documentation",
        "Staff compliance training",
        "Policy and procedure management"
      ],
      benefits: [
        "Reduced compliance risks",
        "Simplified regulatory reporting",
        "Enhanced patient data security",
        "Streamlined audit processes",
        "Improved organizational accountability"
      ]
    },
    {
      title: "Patient Engagement Solutions",
      description: "Digital tools to enhance patient engagement and self-management",
      icon: <Zap className="h-5 w-5" />,
      status: "in-progress",
      className: "border-l-blue-500",
      features: [
        "Patient education resources",
        "Self-service appointment booking",
        "Medication adherence tracking",
        "Remote patient monitoring integration",
        "Secure messaging with care team"
      ],
      benefits: [
        "Increased patient activation",
        "Improved treatment adherence",
        "Enhanced patient satisfaction",
        "Reduced missed appointments",
        "Better health outcomes"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Healthcare CRM Strategies</h1>
        <p className="text-muted-foreground">
          Comprehensive approaches to enhance patient relationships, improve care coordination, and optimize healthcare operations.
        </p>
      </div>

      <div className="grid gap-6">
        {strategies.map((strategy, index) => (
          <StrategyItem key={index} {...strategy} />
        ))}
      </div>
    </div>
  );
};

export default StrategiesContent;
