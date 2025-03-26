
// Define feature categories and their features
export interface Feature {
  name: string;
  description: string;
  implemented?: boolean;
  comingSoon?: boolean;
}

export interface FeatureCategory {
  name: string;
  features: Feature[];
}

export const featuresList: FeatureCategory[] = [
  {
    name: "Contact Management",
    features: [
      {
        name: "Contact Database",
        description: "Store and manage all your customer contacts in one place",
        implemented: true,
      },
      {
        name: "Contact Organization",
        description: "Tag, segment, and categorize contacts",
        implemented: true,
      },
      {
        name: "Import/Export",
        description: "Easily import and export contact data",
        implemented: true,
      },
    ],
  },
  {
    name: "Lead Management",
    features: [
      {
        name: "Lead Capture",
        description: "Capture leads from various sources",
        implemented: true,
      },
      {
        name: "Lead Scoring",
        description: "Score leads based on engagement and potential",
        comingSoon: true,
      },
      {
        name: "Lead Nurturing",
        description: "Nurture leads through automated workflows",
        implemented: true,
      },
      {
        name: "Lead Conversion",
        description: "Convert qualified leads into customers with streamlined processes",
        implemented: true,
      },
      {
        name: "Lead Source Tracking",
        description: "Track and analyze which sources generate the most valuable leads",
        implemented: true,
      },
    ],
  },
  {
    name: "Sales Pipeline",
    features: [
      {
        name: "Deal Tracking",
        description: "Track deals through your sales pipeline",
        implemented: true,
      },
      {
        name: "Sales Analytics",
        description: "Analyze sales data and performance",
        implemented: true,
      },
      {
        name: "Forecasting",
        description: "Forecast future sales and revenue",
        comingSoon: true,
      },
      {
        name: "Opportunity Management",
        description: "Manage and prioritize sales opportunities",
        implemented: true,
      },
      {
        name: "Sales Goals",
        description: "Set and track sales targets for individuals and teams",
        implemented: true,
      },
    ],
  },
  {
    name: "Customer Service",
    features: [
      {
        name: "Ticket Management",
        description: "Manage customer service tickets and support requests",
        implemented: true,
      },
      {
        name: "Knowledge Base",
        description: "Create and maintain a customer knowledge base",
        implemented: true,
      },
      {
        name: "Service Analytics",
        description: "Analyze customer service performance and satisfaction metrics",
        implemented: true,
      },
      {
        name: "Live Chat Support",
        description: "Engage with customers through real-time chat support",
        implemented: true,
      },
      {
        name: "Customer Feedback",
        description: "Collect and analyze customer feedback to improve service",
        implemented: true,
      },
    ],
  },
  {
    name: "Marketing",
    features: [
      {
        name: "Email Campaigns",
        description: "Create and send personalized email campaigns",
        implemented: true,
      },
      {
        name: "Campaign Analytics",
        description: "Track and analyze marketing campaign performance",
        implemented: true,
      },
      {
        name: "Automation",
        description: "Automate marketing workflows and tasks",
        implemented: true,
      },
      {
        name: "Social Media Integration",
        description: "Connect and manage social media accounts within the CRM",
        implemented: true,
      },
      {
        name: "Content Calendar",
        description: "Plan and schedule marketing content across channels",
        implemented: true,
      },
    ],
  },
];
