
import React from "react";
import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FeatureItem {
  id: string;
  name: string;
  description: string;
  implemented: boolean;
  category: string;
}

// Comprehensive list of CRM features organized by category
const featuresList: FeatureItem[] = [
  // Contact Management
  {
    id: "contact-mgmt",
    name: "Contact Management",
    description: "Create and manage customer profiles with detailed information",
    implemented: false,
    category: "Core CRM"
  },
  {
    id: "contact-import",
    name: "Contact Import/Export",
    description: "Bulk import and export contacts from various file formats",
    implemented: false,
    category: "Core CRM"
  },
  {
    id: "contact-segmentation",
    name: "Contact Segmentation",
    description: "Group contacts based on custom criteria and tags",
    implemented: false,
    category: "Core CRM"
  },
  {
    id: "contact-activity",
    name: "Activity Tracking",
    description: "Log and view all interactions with each contact",
    implemented: false,
    category: "Core CRM"
  },
  
  // Lead Management
  {
    id: "lead-capture",
    name: "Lead Capture",
    description: "Web forms and landing pages to collect new leads",
    implemented: false,
    category: "Lead Management"
  },
  {
    id: "lead-scoring",
    name: "Lead Scoring",
    description: "Prioritize leads based on engagement and fit criteria",
    implemented: false,
    category: "Lead Management"
  },
  {
    id: "lead-nurturing",
    name: "Lead Nurturing",
    description: "Automated workflows to nurture leads through the sales funnel",
    implemented: false,
    category: "Lead Management"
  },
  {
    id: "lead-conversion",
    name: "Lead Conversion",
    description: "Convert qualified leads into customers with tracking",
    implemented: false,
    category: "Lead Management"
  },
  
  // Sales Management
  {
    id: "pipeline-mgmt",
    name: "Pipeline Management",
    description: "Visual deal stages and opportunity tracking",
    implemented: false,
    category: "Sales Management"
  },
  {
    id: "sales-forecasting",
    name: "Sales Forecasting",
    description: "Predict future sales based on pipeline and historical data",
    implemented: false,
    category: "Sales Management"
  },
  {
    id: "quote-proposal",
    name: "Quote & Proposal Creation",
    description: "Create and send professional quotes and proposals",
    implemented: false,
    category: "Sales Management"
  },
  {
    id: "sales-automation",
    name: "Sales Automation",
    description: "Automate repetitive sales tasks and follow-ups",
    implemented: false,
    category: "Sales Management"
  },
  
  // Customer Service
  {
    id: "ticket-mgmt",
    name: "Ticket Management",
    description: "Create, assign, and track customer support tickets",
    implemented: false,
    category: "Customer Service"
  },
  {
    id: "knowledge-base",
    name: "Knowledge Base",
    description: "Self-service repository of help articles and guides",
    implemented: false,
    category: "Customer Service"
  },
  {
    id: "customer-portal",
    name: "Customer Portal",
    description: "Branded portal for customers to access information and support",
    implemented: false,
    category: "Customer Service"
  },
  {
    id: "service-automation",
    name: "Service Automation",
    description: "Automated ticket routing and customer response workflows",
    implemented: false,
    category: "Customer Service"
  },
  
  // Marketing
  {
    id: "email-marketing",
    name: "Email Marketing",
    description: "Create, send, and track email campaigns",
    implemented: false,
    category: "Marketing"
  },
  {
    id: "marketing-automation",
    name: "Marketing Automation",
    description: "Automated marketing workflows and drip campaigns",
    implemented: false,
    category: "Marketing"
  },
  {
    id: "campaign-mgmt",
    name: "Campaign Management",
    description: "Plan, execute, and measure marketing campaigns",
    implemented: false,
    category: "Marketing"
  },
  {
    id: "social-integration",
    name: "Social Media Integration",
    description: "Connect social profiles and track social interactions",
    implemented: false,
    category: "Marketing"
  },
  
  // Analytics & Reporting
  {
    id: "dashboards",
    name: "Customizable Dashboards",
    description: "Create personalized views with relevant KPIs",
    implemented: true,
    category: "Analytics & Reporting"
  },
  {
    id: "reporting",
    name: "Advanced Reporting",
    description: "Generate detailed reports on sales, marketing, and service",
    implemented: false,
    category: "Analytics & Reporting"
  },
  {
    id: "analytics",
    name: "Analytics & Insights",
    description: "Data analysis tools to identify trends and opportunities",
    implemented: false,
    category: "Analytics & Reporting"
  },
  {
    id: "export-reports",
    name: "Export & Scheduling",
    description: "Export reports and schedule automated report delivery",
    implemented: false,
    category: "Analytics & Reporting"
  },
  
  // Communication
  {
    id: "email-integration",
    name: "Email Integration",
    description: "Two-way email sync with tracking and templates",
    implemented: false,
    category: "Communication"
  },
  {
    id: "messaging",
    name: "In-app Messaging",
    description: "Internal messaging system for team communication",
    implemented: true,
    category: "Communication"
  },
  {
    id: "call-tracking",
    name: "Call Tracking & Recording",
    description: "Log calls and record conversations with customers",
    implemented: false,
    category: "Communication"
  },
  {
    id: "video-conferencing",
    name: "Video Conferencing",
    description: "Built-in or integrated video meeting capabilities",
    implemented: false,
    category: "Communication"
  },
  
  // Calendar & Tasks
  {
    id: "calendar",
    name: "Calendar Management",
    description: "Integrated calendar with appointment scheduling",
    implemented: true,
    category: "Calendar & Tasks"
  },
  {
    id: "task-mgmt",
    name: "Task Management",
    description: "Create, assign, and track tasks and to-dos",
    implemented: false,
    category: "Calendar & Tasks"
  },
  {
    id: "reminders",
    name: "Reminders & Notifications",
    description: "Automated reminders for tasks and appointments",
    implemented: false,
    category: "Calendar & Tasks"
  },
  {
    id: "meeting-scheduler",
    name: "Meeting Scheduler",
    description: "Allow clients to book meetings based on availability",
    implemented: false,
    category: "Calendar & Tasks"
  },
  
  // Documents & Storage
  {
    id: "document-mgmt",
    name: "Document Management",
    description: "Store and organize documents related to customers",
    implemented: false,
    category: "Documents & Storage"
  },
  {
    id: "file-sharing",
    name: "File Sharing",
    description: "Securely share files with customers and team members",
    implemented: false,
    category: "Documents & Storage"
  },
  {
    id: "e-signatures",
    name: "E-Signatures",
    description: "Electronic signature capabilities for agreements",
    implemented: false,
    category: "Documents & Storage"
  },
  {
    id: "version-control",
    name: "Version Control",
    description: "Track document revisions and maintain history",
    implemented: false,
    category: "Documents & Storage"
  },
  
  // Automation & Workflow
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    description: "Create custom workflows and business processes",
    implemented: false,
    category: "Automation & Workflow"
  },
  {
    id: "notification-system",
    name: "Notification System",
    description: "Automated alerts for important events and activities",
    implemented: false,
    category: "Automation & Workflow"
  },
  {
    id: "approval-processes",
    name: "Approval Processes",
    description: "Multi-step approval workflows for deals and documents",
    implemented: false,
    category: "Automation & Workflow"
  },
  {
    id: "business-rules",
    name: "Business Rules Engine",
    description: "Logic-based rules for automating decision making",
    implemented: false,
    category: "Automation & Workflow"
  },
  
  // Integration & API
  {
    id: "third-party-integrations",
    name: "Third-party Integrations",
    description: "Connect with other business tools and platforms",
    implemented: false,
    category: "Integration & API"
  },
  {
    id: "api-access",
    name: "API Access",
    description: "Developer access to extend and customize functionality",
    implemented: false,
    category: "Integration & API"
  },
  {
    id: "data-sync",
    name: "Data Synchronization",
    description: "Real-time data sync across integrated platforms",
    implemented: false,
    category: "Integration & API"
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Trigger external actions based on CRM events",
    implemented: false,
    category: "Integration & API"
  },
  
  // Security & Compliance
  {
    id: "role-based-access",
    name: "Role-based Access Control",
    description: "Granular permissions for different user roles",
    implemented: false,
    category: "Security & Compliance"
  },
  {
    id: "data-encryption",
    name: "Data Encryption",
    description: "Encryption for data at rest and in transit",
    implemented: true,
    category: "Security & Compliance"
  },
  {
    id: "audit-trail",
    name: "Audit Trail",
    description: "Detailed logs of all system activities",
    implemented: false,
    category: "Security & Compliance"
  },
  {
    id: "compliance-features",
    name: "Compliance Features",
    description: "Tools to maintain compliance with regulations like GDPR, HIPAA",
    implemented: true,
    category: "Security & Compliance"
  },
  
  // Mobile & Accessibility
  {
    id: "mobile-app",
    name: "Mobile Application",
    description: "Native mobile apps for iOS and Android",
    implemented: false,
    category: "Mobile & Accessibility"
  },
  {
    id: "responsive-design",
    name: "Responsive Design",
    description: "Optimized for all screen sizes and devices",
    implemented: true,
    category: "Mobile & Accessibility"
  },
  {
    id: "offline-access",
    name: "Offline Access",
    description: "Access key features without internet connection",
    implemented: false,
    category: "Mobile & Accessibility"
  },
  {
    id: "accessibility-compliance",
    name: "Accessibility Compliance",
    description: "WCAG compliance for users with disabilities",
    implemented: false,
    category: "Mobile & Accessibility"
  },
  
  // Customization
  {
    id: "custom-fields",
    name: "Custom Fields",
    description: "Create custom fields for any object type",
    implemented: false,
    category: "Customization"
  },
  {
    id: "custom-objects",
    name: "Custom Objects",
    description: "Define new entity types beyond standard objects",
    implemented: false,
    category: "Customization"
  },
  {
    id: "branding-options",
    name: "Branding Options",
    description: "Customize interface with company branding",
    implemented: false,
    category: "Customization"
  },
  {
    id: "page-layouts",
    name: "Page Layouts",
    description: "Customize page layouts for different user roles",
    implemented: false,
    category: "Customization"
  }
];

const CRMFeaturesList = () => {
  // Group features by category
  const groupedFeatures: Record<string, FeatureItem[]> = featuresList.reduce(
    (acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = [];
      }
      acc[feature.category].push(feature);
      return acc;
    },
    {} as Record<string, FeatureItem[]>
  );

  // Get categories in order
  const categories = Object.keys(groupedFeatures);

  // Calculate implementation progress
  const implementedCount = featuresList.filter(f => f.implemented).length;
  const totalCount = featuresList.length;
  const progressPercentage = Math.round((implementedCount / totalCount) * 100);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">NextCRM Feature Roadmap</h1>
        <p className="text-lg text-muted-foreground">
          Tracking our progress in building a comprehensive CRM platform
        </p>
        <div className="mt-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="h-4 w-full max-w-md bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">{implementedCount}</span> of <span className="font-medium">{totalCount}</span> features implemented ({progressPercentage}%)
          </p>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <Separator className="mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedFeatures[category].map((feature) => (
              <Card key={feature.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 rounded-full p-1 ${feature.implemented ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                    {feature.implemented ? 
                      <Check className="h-4 w-4" /> : 
                      <X className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CRMFeaturesList;
