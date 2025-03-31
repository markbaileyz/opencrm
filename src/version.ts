
/**
 * Application version information
 * Update this file when releasing new versions
 */

export const VERSION = {
  major: 1,
  minor: 1,
  patch: 1,
  build: 22,
  toString: function() {
    return `${this.major}.${this.minor}.${this.patch} (${this.build})`;
  }
};

/**
 * Version history for changelog
 */
export const VERSION_HISTORY = [
  {
    version: "1.1.1",
    date: "2023-09-01",
    changes: [
      "Enhanced roadmap progress visualization",
      "Added project completion metrics",
      "Started mobile responsiveness improvements",
      "Preparing offline support enhancements",
      "Updated version tracking system"
    ]
  },
  {
    version: "1.1.0",
    date: "2023-08-25",
    changes: [
      "Enhanced roadmap with progress tracking",
      "Improved version display",
      "Added workflow analytics dashboard",
      "Implemented compliance reporting",
      "Enhanced healthcare CRM strategies"
    ]
  },
  {
    version: "1.0.0",
    date: "2023-06-14",
    changes: [
      "Initial release of the OpenSRM application",
      "Patient health tracking features",
      "Medical records management",
      "Medication tracking"
    ]
  }
];

/**
 * Roadmap status information
 */
export const ROADMAP_STATUS = {
  completed: {
    sections: [
      "Basic Structure",
      "Progress Indicators",
      "Visual Enhancements",
      "User Interaction Features",
      "Strategic Planning",
      "Technical Documentation", 
      "Interactive Visualizations",
      "Reports System",
      "Data Management",
      "Organizations Module Enhancement",
      "Settings Section Enhancement",
      "Healthcare CRM Enhancement",
      "Office Management System",
      "Health Tracker Enhancement",
      "Call Tracking Enhancement",
      "Workflow Automation System",
      "Enhanced Offline Support",
      "Interactive Guides and Walkthroughs"
    ],
    percentage: 100
  },
  inProgress: {
    sections: [
      "Content Development",
      "Mobile Responsiveness"
    ],
    focusArea: "Mobile Responsiveness",
    tasks: [
      "Add offline capabilities for mobile users",
      "Implement progressive web app features",
      "Create mobile-specific navigation patterns",
      "Optimize image and asset loading for mobile networks"
    ],
    percentage: {
      "Content Development": 85,
      "Mobile Responsiveness": 80
    }
  },
  nextSteps: [
    "Complete Mobile Responsiveness enhancements",
    "Finish Content Development section",
    "Begin Organizations Module Extensions",
    "Expand Health Tracker with additional features"
  ]
};
