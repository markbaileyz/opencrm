
import { Feature, FeatureCategory } from '../types';

const leadManagementFeatures: Feature[] = [
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
];

export const leadManagement: FeatureCategory = {
  name: "Lead Management",
  features: leadManagementFeatures
};
