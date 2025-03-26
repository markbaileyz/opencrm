
// Define feature categories and their features
export interface Feature {
  name: string;
  description: string;
  implemented?: boolean;
  comingSoon?: boolean;
  votes?: number;
  technicalDetails?: string;
  progress?: number; // New property for implementation progress percentage
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
        technicalDetails: "Built on PostgreSQL database with real-time syncing. Includes full-text search capabilities and automatic data validation.",
        progress: 100
      },
      {
        name: "Contact Organization",
        description: "Tag, segment, and categorize contacts",
        implemented: true,
        votes: 38,
        technicalDetails: "Hierarchical tagging system with custom attributes. Supports both automated and manual categorization rules.",
        progress: 100
      },
      {
        name: "Import/Export",
        description: "Easily import and export contact data",
        implemented: true,
        votes: 35,
        technicalDetails: "Supports CSV, Excel, and VCF formats. Includes field mapping assistant and duplicate detection algorithms.",
        progress: 100
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
        technicalDetails: "Integration with web forms, email, social media, and third-party lead providers. Includes real-time validation and enrichment.",
        progress: 100
      },
      {
        name: "Lead Scoring",
        description: "Score leads based on engagement and potential",
        comingSoon: true,
        votes: 64,
        technicalDetails: "AI-powered scoring algorithm using behavioral data, demographic information, and engagement metrics. Custom scoring models available.",
        progress: 40
      },
      {
        name: "Lead Nurturing",
        description: "Nurture leads through automated workflows",
        implemented: true,
        votes: 48,
        technicalDetails: "Multi-step drip campaign system with conditional logic. A/B testing capabilities and engagement analytics.",
        progress: 100
      },
      {
        name: "Lead Conversion",
        description: "Convert qualified leads into customers with streamlined processes",
        implemented: true,
        votes: 39,
        technicalDetails: "Automated lead-to-customer conversion workflows with customizable approval processes and notification system.",
        progress: 100
      },
      {
        name: "Lead Source Tracking",
        description: "Track and analyze which sources generate the most valuable leads",
        implemented: true,
        votes: 32,
        technicalDetails: "UTM parameter tracking, referral source analysis, and attribution modeling to determine most effective lead channels.",
        progress: 100
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
        technicalDetails: "Customizable pipeline stages with drag-and-drop deal movement. Includes stage-based automation triggers and velocity tracking.",
        progress: 100
      },
      {
        name: "Sales Analytics",
        description: "Analyze sales data and performance",
        implemented: true,
        votes: 41,
        technicalDetails: "Real-time dashboard with key performance indicators. Includes trend analysis, win/loss ratios, and sales cycle metrics.",
        progress: 100
      },
      {
        name: "Forecasting",
        description: "Forecast future sales and revenue",
        comingSoon: true,
        votes: 59,
        technicalDetails: "Predictive forecasting using machine learning algorithms based on historical data. Adjustable confidence intervals and scenario modeling.",
        progress: 35
      },
      {
        name: "Opportunity Management",
        description: "Manage and prioritize sales opportunities",
        implemented: true,
        votes: 37,
        technicalDetails: "Weighted opportunity scoring with customizable attributes. Includes probability calculation and activity tracking.",
        progress: 100
      },
      {
        name: "Sales Goals",
        description: "Set and track sales targets for individuals and teams",
        implemented: true,
        votes: 33,
        technicalDetails: "Hierarchical goal setting from organization to individual levels. Progress tracking with visual indicators and achievement rewards.",
        progress: 100
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
        technicalDetails: "Multi-channel ticket creation (email, chat, phone, social). Includes SLA management, priority routing, and escalation workflows.",
        progress: 100
      },
      {
        name: "Knowledge Base",
        description: "Create and maintain a customer knowledge base",
        implemented: true,
        votes: 36,
        technicalDetails: "Fully searchable article repository with version control. Includes content suggestions based on common ticket topics.",
        progress: 100
      },
      {
        name: "Service Analytics",
        description: "Analyze customer service performance and satisfaction metrics",
        implemented: true,
        votes: 34,
        technicalDetails: "Comprehensive reporting on resolution times, customer satisfaction scores, and agent performance. Includes trend analysis and bottleneck identification.",
        progress: 100
      },
      {
        name: "Live Chat Support",
        description: "Engage with customers through real-time chat support",
        implemented: true,
        votes: 51,
        technicalDetails: "Real-time chat interface with typing indicators, file sharing, and chat history. Includes chatbot integration for common queries.",
        progress: 100
      },
      {
        name: "Customer Feedback",
        description: "Collect and analyze customer feedback to improve service",
        implemented: true,
        votes: 47,
        technicalDetails: "Automated surveys using NPS, CSAT, and CES methodologies. Includes sentiment analysis and actionable insight generation.",
        progress: 100
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
        technicalDetails: "Drag-and-drop email builder with responsive templates. Includes personalization tokens, A/B testing, and delivery optimization.",
        progress: 100
      },
      {
        name: "Campaign Analytics",
        description: "Track and analyze marketing campaign performance",
        implemented: true,
        votes: 39,
        technicalDetails: "Comprehensive metrics including open rates, click-through rates, conversions, and ROI calculation. Includes cross-campaign comparison.",
        progress: 100
      },
      {
        name: "Automation",
        description: "Automate marketing workflows and tasks",
        implemented: true,
        votes: 53,
        technicalDetails: "Visual workflow builder with triggers, conditions, and actions. Includes behavior-based branching and multi-channel capabilities.",
        progress: 100
      },
      {
        name: "Social Media Integration",
        description: "Connect and manage social media accounts within the CRM",
        implemented: true,
        votes: 49,
        technicalDetails: "Post scheduling, engagement monitoring, and audience analytics across major social platforms. Includes social listening capabilities.",
        progress: 100
      },
      {
        name: "Content Calendar",
        description: "Plan and schedule marketing content across channels",
        implemented: true,
        votes: 46,
        technicalDetails: "Visual calendar interface with drag-and-drop scheduling. Includes content approval workflows and performance forecasting.",
        progress: 100
      },
      {
        name: "AI-Driven Content Suggestions",
        description: "Get AI-powered suggestions for marketing content",
        comingSoon: true,
        votes: 61,
        technicalDetails: "Natural language processing algorithms that analyze audience engagement and suggest optimal content types, topics, and messaging.",
        progress: 20
      },
    ],
  },
];
