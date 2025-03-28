
/**
 * Application version information
 * Update this file when releasing new versions
 */

export const VERSION = {
  major: 1,
  minor: 0,
  patch: 0,
  build: 1,
  toString: function() {
    return `${this.major}.${this.minor}.${this.patch} (${this.build})`;
  }
};

/**
 * Version history for changelog
 */
export const VERSION_HISTORY = [
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
