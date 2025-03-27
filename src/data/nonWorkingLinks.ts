
/**
 * This file catalogs links that need to be implemented or fixed.
 * It serves as a reference for future development tasks.
 */

export const nonWorkingLinks = [
  {
    path: "/medical-records",
    status: "Placeholder",
    description: "Medical records view needs implementation",
    priority: "High"
  },
  {
    path: "/medications",
    status: "Placeholder",
    description: "Medications management needs implementation",
    priority: "High"
  },
  {
    path: "/health-tracker",
    status: "Placeholder",
    description: "Health tracking features need implementation",
    priority: "Medium"
  },
  {
    path: "/clinical-dashboard",
    status: "Placeholder",
    description: "Clinical dashboard for doctors needs implementation",
    priority: "Medium"
  },
  {
    path: "/prescriptions",
    status: "Placeholder",
    description: "Prescription management needs implementation",
    priority: "High"
  },
  {
    path: "/patient-vitals",
    status: "Placeholder",
    description: "Patient vitals tracking needs implementation",
    priority: "Medium"
  },
  {
    path: "/secure-chat",
    status: "Placeholder",
    description: "Secure messaging system needs implementation",
    priority: "High"
  },
  {
    path: "/patient-feedback",
    status: "Placeholder",
    description: "Patient feedback collection and management needs implementation",
    priority: "Low"
  },
  {
    path: "/office-management",
    status: "Basic Implementation",
    description: "Office management page needs further features",
    priority: "Medium"
  }
];

/**
 * Utility function to get links by priority
 */
export const getLinksByPriority = (priority: string) => {
  return nonWorkingLinks.filter(link => link.priority === priority);
};

/**
 * Utility function to get links by status
 */
export const getLinksByStatus = (status: string) => {
  return nonWorkingLinks.filter(link => link.status === status);
};
