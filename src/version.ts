
/**
 * Application version information
 * Update this file when releasing new versions
 */

export const VERSION = {
  major: 1,
  minor: 1,
  patch: 3,
  build: 24,
  toString: function() {
    return `${this.major}.${this.minor}.${this.patch} (${this.build})`;
  }
};

/**
 * Version history for changelog
 */
export const VERSION_HISTORY = [
  {
    version: "1.1.3",
    date: "2024-04-15",
    changes: [
      "Advanced patient vitals visualization with historical data",
      "Implemented anomaly detection in vitals readings",
      "Added statistical analysis for patient vitals",
      "Enhanced mobile health tracking experience",
      "Improved healthcare-specific features foundation"
    ]
  },
  {
    version: "1.1.2",
    date: "2024-04-12",
    changes: [
      "Added healthcare-specific roadmap features",
      "Enhanced vitals tracking requirements",
      "Added medication management and prescriptions",
      "Incorporated specialized user views for healthcare roles",
      "Added security and compliance features"
    ]
  },
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
      "Mobile Responsiveness",
      "Healthcare-Specific Features"
    ],
    focusArea: "Healthcare-Specific Features",
    tasks: [
      "Implement advanced patient vitals graphing",
      "Develop anomaly detection for vital signs",
      "Create statistical analysis for patient baselines",
      "Build medication-patient relationship system"
    ],
    percentage: {
      "Content Development": 85,
      "Mobile Responsiveness": 80,
      "Healthcare-Specific Features": 35
    }
  },
  nextSteps: [
    "Continue Healthcare-Specific Features development",
    "Implement Medication Management system",
    "Create Role-Based Views for healthcare providers",
    "Enhance Patient Documentation System",
    "Complete Mobile Responsiveness enhancements"
  ]
};
