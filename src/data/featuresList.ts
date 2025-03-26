// Define feature categories and their features
export interface Feature {
  name: string;
  description: string;
  implemented?: boolean;
  comingSoon?: boolean;
  votes?: number;
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
        votes: 42,
      },
      {
        name: "Contact Organization",
        description: "Tag, segment, and categorize contacts",
        implemented: true,
        votes: 38,
      },
      {
        name: "Import/Export",
        description: "Easily import and export contact data",
        implemented: true,
        votes: 35,
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
        votes: 56,
      },
      {
        name: "Lead Scoring",
        description: "Score leads based on engagement and potential",
        comingSoon: true,
        votes: 64,
      },
      {
        name: "Lead Nurturing",
        description: "Nurture leads through automated workflows",
        implemented: true,
        votes: 48,
      },
      {
        name: "Lead Conversion",
        description: "Convert qualified leads into customers with streamlined processes",
        implemented: true,
        votes: 39,
      },
      {
        name: "Lead Source Tracking",
        description: "Track and analyze which sources generate the most valuable leads",
        implemented: true,
        votes: 32,
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
        votes: 45,
      },
      {
        name: "Sales Analytics",
        description: "Analyze sales data and performance",
        implemented: true,
        votes: 41,
      },
      {
        name: "Forecasting",
        description: "Forecast future sales and revenue",
        comingSoon: true,
        votes: 59,
      },
      {
        name: "Opportunity Management",
        description: "Manage and prioritize sales opportunities",
        implemented: true,
        votes: 37,
      },
      {
        name: "Sales Goals",
        description: "Set and track sales targets for individuals and teams",
        implemented: true,
        votes: 33,
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
        votes: 40,
      },
      {
        name: "Knowledge Base",
        description: "Create and maintain a customer knowledge base",
        implemented: true,
        votes: 36,
      },
      {
        name: "Service Analytics",
        description: "Analyze customer service performance and satisfaction metrics",
        implemented: true,
        votes: 34,
      },
      {
        name: "Live Chat Support",
        description: "Engage with customers through real-time chat support",
        implemented: true,
        votes: 51,
      },
      {
        name: "Customer Feedback",
        description: "Collect and analyze customer feedback to improve service",
        implemented: true,
        votes: 47,
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
        votes: 44,
      },
      {
        name: "Campaign Analytics",
        description: "Track and analyze marketing campaign performance",
        implemented: true,
        votes: 39,
      },
      {
        name: "Automation",
        description: "Automate marketing workflows and tasks",
        implemented: true,
        votes: 53,
      },
      {
        name: "Social Media Integration",
        description: "Connect and manage social media accounts within the CRM",
        implemented: true,
        votes: 49,
      },
      {
        name: "Content Calendar",
        description: "Plan and schedule marketing content across channels",
        implemented: true,
        votes: 46,
      },
    ],
  },
];
