
import { Feature, FeatureCategory } from '../types';

const customerServiceFeatures: Feature[] = [
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
];

export const customerService: FeatureCategory = {
  name: "Customer Service",
  features: customerServiceFeatures
};
