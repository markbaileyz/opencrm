
import { healthcareRoadmap } from './healthcare-roadmap';

export const nextSteps = [
  ...healthcareRoadmap,
  {
    id: 11,
    title: "Content Development (Continued)",
    items: [
      "Enhance forum functionality with post creation workflow",
      "Implement comment and reply system for forum posts",
      "Create user profile pages for forum participants",
      "Add user reputation system",
      "Implement solution submission workflow",
      "Create social sharing options for tutorials",
      "Add user-generated content support"
    ]
  },
  {
    id: 12,
    title: "Organizations Module Enhancement (Continued)",
    items: [
      "Industry-specific organization templates",
      "Integrated communication tools",
      "Organization performance analytics"
    ]
  },
  {
    id: 13,
    title: "Mobile Responsiveness Enhancement (Continued)",
    items: [
      "Add offline capabilities for mobile users",
      "Implement progressive web app features",
      "Create mobile-specific navigation patterns",
      "Optimize image and asset loading for mobile networks"
    ]
  },
  {
    id: 14,
    title: "Health Tracker Enhancement (Continued)",
    items: [
      "Implement medication tracking and reminders",
      "Add exercise routine builder",
      "Create personalized health recommendations",
      "Implement health goal setting wizard",
      "Add PDF export for health reports",
      "Develop wearable device integration"
    ]
  },
  {
    id: 15,
    title: "Workflow Automation Enhancement (Continued)",
    items: [
      "Workflow templates library",
      "Integration with external systems",
      "Workflow versioning and rollback capabilities"
    ]
  }
];
