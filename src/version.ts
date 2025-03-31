
/**
 * Application version information
 * Update this file when releasing new versions
 */

export const VERSION = {
  major: 1,
  minor: 1,
  patch: 0,
  build: 21,
  toString: function() {
    return `${this.major}.${this.minor}.${this.patch} (${this.build})`;
  }
};

/**
 * Version history for changelog
 */
export const VERSION_HISTORY = [
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
