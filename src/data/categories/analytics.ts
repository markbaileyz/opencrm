
import { Feature, FeatureCategory } from '../types';

const analyticsFeatures: Feature[] = [
  {
    name: "Usage Dashboards",
    description: "Interactive dashboards showing feature usage and user engagement",
    implemented: true,
    votes: 94,
    technicalDetails: "Built with React and Recharts, providing real-time metrics on feature adoption and user activity patterns.",
    progress: 100
  },
  {
    name: "Custom Reports",
    description: "Create and schedule custom reports for stakeholders",
    comingSoon: true,
    votes: 76,
    technicalDetails: "Report builder with drag-and-drop interface. Supports PDF exports, email scheduling, and parameterized filters.",
    progress: 65,
    comments: [
      {
        id: "report-1",
        author: "Data Analyst",
        text: "Will this support embedding in our existing BI tools?",
        date: "2023-10-12T16:45:00Z"
      }
    ]
  },
  {
    name: "Predictive Analytics",
    description: "AI-powered insights and forecasting for patient outcomes",
    comingSoon: true,
    votes: 88,
    technicalDetails: "Machine learning models trained on anonymized patient data to predict outcomes, identify risk factors, and suggest interventions.",
    progress: 30
  },
  {
    name: "ROI Calculator",
    description: "Measure the return on investment for healthcare initiatives",
    implemented: true,
    votes: 72,
    technicalDetails: "Financial modeling tools that account for staffing costs, time savings, improved outcomes, and revenue increases.",
    progress: 100
  },
  {
    name: "Population Health Metrics",
    description: "Track health outcomes across patient populations",
    comingSoon: true,
    votes: 85,
    technicalDetails: "Aggregated health metrics with demographic filtering and trend analysis. Compliant with HEDIS measures and value-based care reporting.",
    progress: 45,
    comments: [
      {
        id: "pop-1",
        author: "Healthcare Director",
        text: "This will be essential for our ACO reporting requirements.",
        date: "2023-09-28T10:15:00Z"
      },
      {
        id: "pop-2",
        author: "Research Lead",
        text: "Can we export this data for academic research purposes?",
        date: "2023-10-01T14:22:00Z"
      }
    ]
  }
];

export const analytics: FeatureCategory = {
  name: "Analytics & Reporting",
  features: analyticsFeatures
};
