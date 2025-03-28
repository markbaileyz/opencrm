
import { roadmapProgress } from "@/data/roadmap";

// Calculate total number of completed items
export const getTotalCompletedItems = () => {
  return roadmapProgress.completedFeatures.reduce((total, category) => {
    return total + category.items.length;
  }, 0);
};

// Calculate total number of pending items
export const getTotalPendingItems = () => {
  return roadmapProgress.nextSteps.reduce((total, category) => {
    return total + category.items.length;
  }, 0);
};

// Get the latest updates as a string
export const getLatestUpdates = (count: number = 5) => {
  return roadmapProgress.lastUpdated.changes.slice(0, count);
};

// Get completion percentage for roadmap
export const getRoadmapCompletionPercentage = () => {
  const completed = getTotalCompletedItems();
  const pending = getTotalPendingItems();
  const total = completed + pending;
  
  return Math.round((completed / total) * 100);
};
