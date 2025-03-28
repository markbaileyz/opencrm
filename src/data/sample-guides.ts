
import { Guide } from "../types/guide-context";

// Sample guides data - in a real app this might come from an API
export const sampleGuides: Guide[] = [
  {
    id: "new-patient-workflow",
    name: "Creating a New Patient Workflow",
    description: "Learn how to set up an automated workflow for new patient onboarding",
    category: "workflows",
    steps: [
      {
        id: "step-1",
        title: "Access Workflows",
        content: "Navigate to the Workflows section from the main sidebar.",
        elementSelector: "#sidebar-workflows",
        position: "right",
      },
      {
        id: "step-2",
        title: "Create New Workflow",
        content: "Click the 'Create Workflow' button to open the workflow editor.",
        elementSelector: ".create-workflow-button",
        position: "bottom",
      },
      {
        id: "step-3",
        title: "Choose a Template",
        content: "You can start from scratch or select 'New Patient Onboarding' from healthcare templates.",
        elementSelector: ".workflow-templates-button",
        position: "left",
      },
      {
        id: "step-4",
        title: "Configure Steps",
        content: "Add email notifications, form assignments, and follow-up tasks to your workflow.",
        elementSelector: ".workflow-step-builder",
        position: "top",
      },
      {
        id: "step-5",
        title: "Activate Workflow",
        content: "Once you've set up your workflow, activate it to start processing new patients automatically.",
        elementSelector: ".workflow-save-button",
        position: "bottom",
      },
    ],
  },
  {
    id: "patient-health-tracking",
    name: "Patient Health Tracking Guide",
    description: "Learn how to use the health tracking features to monitor patient progress",
    category: "health",
    steps: [
      {
        id: "step-1",
        title: "Access Health Tracker",
        content: "Navigate to the Health Tracker section for your selected patient.",
        elementSelector: "#health-tracker-link",
        position: "right",
      },
      {
        id: "step-2",
        title: "View Vital Signs",
        content: "Check the vital signs dashboard to see patient's current status.",
        elementSelector: ".vitals-section",
        position: "top",
      },
      {
        id: "step-3",
        title: "Track Metrics Over Time",
        content: "Use the trend charts to see how metrics have changed over different periods.",
        elementSelector: ".trends-chart",
        position: "bottom",
      },
      {
        id: "step-4",
        title: "Set Health Goals",
        content: "Create health goals for your patient and track progress toward them.",
        elementSelector: ".health-goals-section",
        position: "left",
      },
    ],
  },
  {
    id: "office-management",
    name: "Office Management Quick Start",
    description: "Learn how to manage your office resources efficiently",
    category: "office",
    steps: [
      {
        id: "step-1",
        title: "Office Dashboard",
        content: "Start with the office dashboard for an overview of all resources.",
        elementSelector: ".office-dashboard",
        position: "top",
      },
      {
        id: "step-2",
        title: "Room Management",
        content: "Check room availability and manage room assignments.",
        elementSelector: ".room-management-section",
        position: "right",
      },
      {
        id: "step-3",
        title: "Staff Scheduling",
        content: "View and adjust staff schedules via the calendar interface.",
        elementSelector: ".staff-calendar",
        position: "bottom",
      },
      {
        id: "step-4",
        title: "Inventory Tracking",
        content: "Monitor supplies and set up automatic reordering when levels are low.",
        elementSelector: ".inventory-section",
        position: "left",
      },
    ],
  },
];
