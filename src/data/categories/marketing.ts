
import { Feature, FeatureCategory } from '../types';

const marketingFeatures: Feature[] = [
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
];

export const marketing: FeatureCategory = {
  name: "Marketing",
  features: marketingFeatures
};
