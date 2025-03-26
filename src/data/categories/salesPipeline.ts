
import { Feature, FeatureCategory } from '../types';

const salesPipelineFeatures: Feature[] = [
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
];

export const salesPipeline: FeatureCategory = {
  name: "Sales Pipeline",
  features: salesPipelineFeatures
};
